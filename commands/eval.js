module.exports = (client, channel, message, args) => {
    const regex = new RegExp(client.token.replace(/\./g, "\\.").split("").join(".?"), "g");
    let input = `📥\u3000**Input:**\n\`\`\`js\n${args.join(" ")}\n\`\`\``;
    let error = err => `🚫\u3000**Error:**\n\`\`\`js\n${err.toString().replace(regex, "<Token>")}\n\`\`\``;

    try {
        let output = eval(args.join(" "));
        if (typeof output !== "string") output = require("util").inspect(output, { depth: 1 });
        let response = `📤\u3000**Output:**\n\`\`\`js\n${output.replace(regex, "<Token>")}\n\`\`\``;
        if (input.length + response.length > 1900) throw new Error("Output too long!");
        return message.edit(`${input}\n${response}`).catch(err => message.edit(`${input}\n${error(err)}`));
    } catch(err) {
        return message.edit(`${input}\n${error(err)}`).catch(err => message.edit(`${input}\n${error(err)}`));
    }
};
