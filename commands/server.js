const util = require("../utilities");

module.exports = (bot, channel, message) => {
    let embed = {
        "color": util.roleColour(message.member),
        "thumbnail": { "url": message.author.avatarURL },
        "fields": [
            {
                "name": "Name",
                "value": message.guild.name,
                "inline": true
            },
            {
                "name": "Region",
                "value": message.guild.region,
                "inline": true
            },
            {
                "name": "Members",
                "value": message.guild.memberCount,
                "inline": true
            }
        ]
    };

    return channel.sendMessage("", { embed })
        .then(() => message.delete())
        .catch(err => util.error(channel, err));
};
