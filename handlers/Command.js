/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/

const fs = require('fs');

module.exports = (client, Hyperz, config) => {
    const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for (const file of commandfiles) {
        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}

/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/