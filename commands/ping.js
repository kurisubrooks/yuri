const util = require("../utilities");

module.exports = (bot, channel, message) => {
    message.channel.sendMessage("Ping...")
    .then((msg) => {
        msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`);
    })
    .catch((err) => {
        return util.error(channel, err);
    });
};
