module.exports = {
    name: 'ticketintro',
    description: 'A command.',
    aliases: ['introduce', 'introduction', 'intro'],
    async execute(client, message, args, Hyperz, config){
        if(message.guild.id === config["main_config"].yourserverid) {
    const per = config["permissions_config"].ticketmanagers
        if(message.member.roles.cache.some(h=>per.includes(h.id))){
    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`This channel is not a ticket.`).then(msg => msg.delete({timeout: 10000})).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    const claimEmbed = new Hyperz.MessageEmbed()
    .setColor(config["main_config"].colorhex)
    .setDescription(`Hello, I'm **${message.author.username}**, with __${config["main_config"].yourservername}__, how may I assist you today?`)
    .setTimestamp()
    .setFooter(`${config["main_config"].copyright}`)
    
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    message.channel.send(claimEmbed)
        } else {
            message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
}
}

// Credits:
// Physical Programming: Hyperz#0001

