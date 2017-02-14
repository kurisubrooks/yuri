const util = require("../utilities");

module.exports = (bot, channel, message, args) => {
    let command = args.splice(0, 1)[0];

    if (command === "stop") {
        setTimeout(() => process.exit(0), 650);
        return util.error(channel, "Restarting!");
    } else if (command === "setGame") {
        return bot.user.setGame(args.join(" "));
    } else {
        return null;
    }
};
