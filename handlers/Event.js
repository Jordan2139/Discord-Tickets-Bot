/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/

const fs = require('fs')

module.exports = (client, Hyperz, config) => {
    const load_dir = (dirs) => {
            const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(`.js`));

            for (const file of event_files) {
                const event = require(`../events/${dirs}/${file}`);
                const event_name = file.split('.')[0];
                client.on(event_name, event.bind(null, client, Hyperz, config));
            }
        }
        ['client', 'guild'].forEach(e => load_dir(e));
}

/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/