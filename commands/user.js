const util = require("../utilities");
const moment = require("moment");

module.exports = (bot, channel, message) => {
    if (message.channel.type !== "text") {
        return util.error(channel, "You must be in a guild text channel to use this command");
    }

    let user = message.mentions.users.first();
    if (!user) user = bot.user;
    let member = message.guild.members.get(user.id);
    let embed = {
        "color": util.roleColour(member),
        "thumbnail": { "url": user.avatarURL },
        "fields": [
            {
                "name": "Name",
                "value": `${member.displayName}#${user.discriminator}`,
                "inline": true
            },
            {
                "name": "ID",
                "value": user.id,
                "inline": true
            },
            {
                "name": "Joined Guild",
                "value": moment.utc(member.joinedTimestamp).format("MMM Do YYYY"),
                "inline": true
            },
            {
                "name": "Playing",
                "value": user.presence.game ? user.presence.game.name : "None",
                "inline": true
            },
            {
                "name": "Bot",
                "value": user.bot ? "Yes" : "No",
                "inline": true
            },
            {
                "name": "Roles",
                "value": member.roles.map(roles => `<@&${roles.id}>`).join(", "),
                "inline": true
            }
        ]
    };

    return channel.sendMessage("", { embed })
        .then(() => message.delete())
        .catch(err => util.error(channel, err));
};
