/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/

module.exports = {
    name: 'ping',
    description: 'Pings the bot.',
    aliases: ['beep', 'tag'],
    async execute(client, message, args, Hyperz, config) {
        const pingEmbed = new Hyperz.MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
            .setDescription(`🏓 Latency is: **${Date.now() - message.createdTimestamp}ms.**`)
            .setTimestamp()
            .setFooter(`Pong!`)

        message.channel.send(pingEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => { if (config["main_config"].debugmode) return console.log(e); });
        message.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); });
    },
}

/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/