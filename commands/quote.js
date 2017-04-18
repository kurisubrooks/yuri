const { RichEmbed } = require("discord.js");
const util = require("../utilities");
const moment = require("moment");

module.exports = async(bot, channel, message, args) => {
    try {
        let response = "";
        if (args[0].indexOf("|") !== -1) {
            response = args[0].substr(args[0].indexOf("|") + 1);
            args[0] = args[0].substr(0, args[0].indexOf("|"));
        }
        const messages = await message.channel.fetchMessages({ around: args[0], limit: 1 });
        const embed = new RichEmbed();
        embed.setAuthor(`${messages.first().author.username}#${messages.first().author.discriminator}`, messages.first().author.displayAvatarURL)
          .setColor(util.roleColour(messages.first()))
          .setFooter(moment(messages.first().createdTimestamp).format("MMM Do - hh:mm a"))
          .setDescription(messages.first().content);
        if (args[1]) {
            args = args.slice(1);
            let breakvar = false;
            for (const int in args) {
                if (args[int].search(/\D/g) === 0) {
                    response = args.slice(int).join(" ");
                    break;
                } else if (args[int].search(/\D/g) !== -1) {
                    response = args[int].substr(args[int].search(/\D/g)) + args.slice(int + 1);
                    args[int] = args[int].substr(0, args[int].search(/\D/g));
                    breakvar = true;
                }
                const add = await message.channel.fetchMessages({ around: args[int], limit: 1 });
                if (message.guild) add.first().member = await message.guild.fetchMember(add.first().author);
                embed.addField(`${add.first().author.username}#${add.first().author.discriminator}`, add.first().content);
                if (breakvar) break;
            }
        }
        if (!embed.fields.length) {
            if (messages.first().embeds && messages.first().embeds[0] && messages.first().embeds[0].thumbnail && messages.first().embeds[0].thumbnail.url) {
                embed.setDescription(embed.description.replace(messages.first().embeds[0].thumbnail.url, ""));
                embed.setImage(messages.first().embeds[0].thumbnail.url);
            } else if (messages.first().attachments.size && messages.first().attachments.first() && messages.first().attachments.first().url) {
                embed.setImage(messages.first().attachments.first().url);
            }
        }
        return message.edit(response, { embed: embed });
    } catch(error) { 
        return message.edit(`Error while running command: \`${error}\``); 
    }
};
