const util = require("../utilities");

module.exports = (bot, channel, message, args) => {
    let embed;

    try {
        embed = JSON.parse(args.join(" "));
    } catch(err) {
        console.error("Couldn't parse");
        console.error(err);
        return util.error(channel, err);
    }

    if (embed.colour) embed.color = embed.colour;
    if (embed.color) embed.color = Number(embed.color);

    return channel.sendMessage("", { embed })
        .then(() => message.delete())
        .catch(err => util.error(channel, err));
};
