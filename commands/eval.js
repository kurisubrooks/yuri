const util = require("../utilities");

module.exports = (bot, channel, message, args) => {
    try {
        let output = eval(args.join(" "));

        if (typeof output !== "string") output = require("util").inspect(output, { depth: 1 });

        let embed = {
            colour: util.roleColour(message.member),
            fields: [
                {
                    name: "Input",
                    value: `\`\`\`js\n${args.join(" ")}\n\`\`\``
                },
                {
                    name: "Output",
                    value: `\`\`\`js\n${output.replace(bot.token, "<Token>")}\n\`\`\``
                }
            ]
        };

        return message.edit("", { embed })
            .catch((err) => util.error(channel, err));
    } catch(error) {
        return util.error(channel, error);
    }
};
