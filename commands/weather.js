const request = require("request");
const config = require("../config");
const util = require("../utilities");

module.exports = (bot, channel, message) => {
    return request("https://api.kurisubrooks.com/api/weather", (err, res, body) => {
        if (err) {
            return util.error(channel, err);
        }

        let response = JSON.parse(body);

        if (response.ok) {
            let embed = {
                "color": config.colours.default,
                "title": "Penrith, NSW Australia",
                "fields": [
                    { "name": "Temperature", "value": `${response.weather.temperature}°`, "inline": true },
                    { "name": "Condition", "value": response.weather.condition, "inline": true },
                    { "name": "Feels Like", "value": `${response.weather.feels_like}°`, "inline": true },
                    { "name": "Humidity", "value": response.weather.humidity, "inline": true },
                    { "name": "UV", "value": response.weather.UV, "inline": true }
                ],
                "thumbnail": { "url": response.weather.image }
            };

            return channel.sendMessage("", { embed })
                .then(() => message.delete())
                .catch(error => util.error(channel, error));
        } else {
            return util.error(channel, response.error);
        }
    });
};
