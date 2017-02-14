const request = require("request");
const qs = require("qs");

const config = require("../config");
const util = require("../utilities");

module.exports = (bot, channel, message, args, command) => {
    if (args.length < 1) {
        return util.error(channel, "2", [command, "to[,from]", "query"]);
    }

    let langs = args[0].split(",");
    langs[0] = langs[0].toLowerCase();
    let to = langs[0];
    let from = langs.length > 1 ? langs[1] : null;
    let query = to === langs[0] ? args.slice(1).join(" ") : args.join(" ");

    let params = {
        to: to,
        from: from,
        query: query
    };

    let fetch = {
        headers: { "User-Agent": "Mozilla/5.0" },
        url: `https://api.kurisubrooks.com/api/translate?${qs.stringify(params)}`
    };

    return request(fetch, (err, res, body) => {
        if (err) {
            return util.error(channel, err);
        }

        let response = JSON.parse(body);
        let to = response.to;
        let from = response.from;
        let query = response.query;
        let result = response.result;

        if (response.ok) {
            let embed = {
                "color": config.colours.default,
                "fields": [
                    { "name": from.name, "value": query },
                    { "name": to.name, "value": result }
                ]
            };

            console.log(to, from, query, result);

            return channel.sendMessage("", { embed })
                .then(() => message.delete())
                .catch(error => util.error(channel, error));
        } else {
            return util.error(channel, response.error);
        }
    });
};
