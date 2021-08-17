/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/

const Hyperz = require('discord.js');
const config = require('./config.json');
const client = new Hyperz.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Hyperz.Collection();
client.events = new Hyperz.Collection();

['Command', 'Event'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Hyperz, config)
})

client.login(config["main_config"].token)

/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/