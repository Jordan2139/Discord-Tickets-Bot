/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/

const fs = require('fs');
const config = require('../../config.json');

module.exports = (client, Hyperz, config, message) => {
    const prefix = config["main_config"].prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases.includes(cmd));

    if (command) command.execute(client, message, args, Hyperz, config)
}

/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/