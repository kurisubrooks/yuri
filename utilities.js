const config = require("./config");

module.exports = {
    roleColour: member => {
        if (!member || !member.roles) return config.default;
        const roles = member.roles.filter(role => role.color !== 0).array().sort((a, b) => a.position - b.position);
        const role = roles[roles.length - 1];
        return role ? role.color : 0;
    },
    onReady: bot => {
        console.log("Ready");
        delete bot.user.email;
        delete bot.user.verified;
        config.owner = bot.user.id;
        bot.user.setPresence({ status: "invisible", afk: true });
    },
    error: (channel, code, usage) => {
        let errors = {
            "0": "Unknown Error",
            "1": "",
            "2": "Missing Arguments",
            "400": "Bad Request"
        };

        let error = Number(code) ? errors[code] : typeof code === "object" ? code.message : code;

        let embed = {
            "color": config.colours.danger,
            "fields": [
                { "name": "Error:", "value": error }
            ]
        };

        if (usage) {
            embed.fields.push({
                "name": "Usage:",
                "value": `\`${config.callsign}${usage.join(" ")}\``
            });
        }

        console.log(embed, embed.fields);

        channel.sendMessage("", { embed })
            .catch(error => console.error(error.status === 400 ? "Bad Request" : error));

        console.error("Error:", embed.fields[0].value);
    }
};
