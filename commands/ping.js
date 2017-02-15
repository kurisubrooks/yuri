const util = require("../utilities");

module.exports = (bot, channel, message) => {
    message.delete();
    return channel.sendMessage("Ping...")
        .then(msg => msg.edit(`Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``))
        .catch(err => util.error(channel, err));
};
