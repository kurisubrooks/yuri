const request = require("request");
const util = require("../utilities");

module.exports = (bot, channel, message) => {
    return request(`http://shibe.online/api/cats?count=1&httpsurls=true`, (error, response, body) => {
        if (error) {
            return util.error(channel, error);
        }

        return channel.sendFile(JSON.parse(body)[0])
            .then(() => message.delete())
            .catch(error => util.error(channel, error));
    });
};
