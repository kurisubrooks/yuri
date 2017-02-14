const util = require("../utilities");

module.exports = (bot, channel, message) => {
    let user = message.mentions.users.first();
    if(user === undefined) return;
    let member = message.guild.members.get(user.id);
    let embed = {
        "color": util.roleColour(member),
        "thumbnail": { "url": user.avatarURL },
        "fields": [
            {
                "name": "Name",
                "value": `${member.displayName}#${user.discriminator}`,
                "inline": true
            },
            {
                "name": "ID",
                "value": user.id,
                "inline": true
            },
            {
                "name": "Joined Guild",
                "value": moment.utc(member.joinedTimestamp).format('MMM Do YYYY'),
                "inline": true
            },
            {
                "name": "Playing",
                "value": user.presence.game ? user.presence.game.name : 'None',
                "inline": true
            },
            {
                "name": "Bot?",
                "value": user.bot,
                "inline": true
            },
            {
                "name": "Avatar URL",
                "value": user.avatarURL
            },
            {
                "name": "Roles",
                "value": member.roles.map(roles => `<@&${roles.id}>`).join(', ')
            }
        ]
    };

    return channel.sendMessage("", { embed })
        .then(() => message.delete())
        .catch(err => util.error(channel, err));
};
