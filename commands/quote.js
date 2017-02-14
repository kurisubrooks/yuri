const util = require("../utilities");

module.exports = (bot, channel, message, args, text) => {
    let embed = {
        "color": util.roleColour(message.member),
        "description": text
    };

    return channel.sendMessage("", { embed })
        .then(() => message.delete())
        .catch(err => util.error(channel, err));
};
