const moment = require("moment");
const util = require("../utilities");

module.exports = (bot, channel, message) => {
    let embed = {
        "color": util.roleColour(message.member),
        "thumbnail": { "url": bot.user.avatarURL },
        "fields": [
            {
                "name": "Uptime",
                "value": moment.duration(bot.uptime, "milliseconds").humanize(),
                "inline": true
            },
            {
                "name": "Memory Usage",
                "value": `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
                "inline": true
            },
            {
                "name": "Node",
                "value": process.version.replace("v", ""),
                "inline": true
            }
        ]
    };

    return channel.sendMessage("", { embed })
        .then(() => message.delete())
        .catch(err => util.error(channel, err));
};
