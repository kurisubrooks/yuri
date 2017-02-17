// Yuri Core v1
// by @kurisubrooks

// Requires
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

// Core
const bot = new Discord.Client();
const commands = new Discord.Collection();
const aliases = new Discord.Collection();
const keychain = require("./keychain");
const config = require("./config");
const util = require("./utilities");

// Initialise Commands
for (const item of config.commands) {
    const location = path.join(__dirname, "commands", `${item.command}.js`);

    // Location doesn't exist, skip loop
    if (!fs.existsSync(location)) continue;

    // Add Command to Commands Collection
    commands.set(item.command, require(location));

    // Set Command Aliases
    if (item.hasOwnProperty("alias")) {
        for (const alias of item.alias) aliases.set(alias, item.command);
    }
}

bot.login(keychain.token);
bot.on("ready", () => util.onReady(bot));
bot.on("error", err => console.error(err));
bot.on("message", message => {
    let channel = message.channel;
    let user = message.author;
    let text = message.cleanContent;
    let args = text.split(" ");
    let attachments = false;
    let needsEdit = false;
    let newMessage = [];

    message.attachments.forEach(() => { attachments = true; });
    message.image = attachments && text.length < 1 ? 1 : 0;
    user.nickname = message.member ? message.member.displayName : message.author.username;

    if (bot.user.id !== user.id) return false;
    if (text.length < 1 && !attachments) return false;
    if (attachments) text += message.image ? "<file>" : " <file>";

    console.log(`${bot.user.username}: ${text}`);

    // Reactions
    for (const value of args) {
        if (value.startsWith(config.sign)) {
            const str = value.replace(config.sign, "");

            if (str in config.reactions) {
                needsEdit = true;
                newMessage.push(config.reactions[str]);
            }
        } else {
            newMessage.push(value);
        }
    }

    if (needsEdit) message.edit(newMessage.join(" "));

    // Command Handler
    if (text.startsWith(config.sign)) {
        const args = text.split(" ");
        const commandName = args.splice(0, 1)[0].toLowerCase().slice(config.sign.length);
        const command = commands.get(commandName) || commands.get(aliases.get(commandName));

        if (!command) return false;

        try {
            return command(bot, channel, message, args, text);
        } catch(error) {
            return util.error(channel, error);
        }
    } else if (text.startsWith(">>")) {
        const source = args.join(" ").slice(">>".length);
        const command = commands.get("quote") || commands.get(aliases.get("quote"));

        try {
            return command(bot, channel, message, args, source);
        } catch(error) {
            return util.error(channel, error);
        }
    }

    return false;
});
