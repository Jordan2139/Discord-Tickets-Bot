module.exports = {
    name: 'ping',
    description: 'Pings the bot.',
    aliases: ['beep', 'tag'],
    async execute(client, message, args, Hyperz, config){
        const pingEmbed = new Hyperz.MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setDescription(`🏓 Latency is: **${Date.now() - message.createdTimestamp}ms.**`)
        .setTimestamp()
        .setFooter(`Pong!`)
        
        message.channel.send(pingEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    },
}