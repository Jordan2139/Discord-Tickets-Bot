module.exports = {
    name: 'ticketpanel',
    description: 'Creates a panel for tickets.',
    aliases: ['newpanel', 'createpanel', 'panelticket', 'panel'],
    async execute(client, message, args, Hyperz, config){

        if(message.guild.id === config["main_config"].yourserverid) {
                if(config["tickets_config"].useTicketReactions) {
                    const per = config["permissions_config"].ticketmanagers
                    if(message.member.roles.cache.some(h=>per.includes(h.id))){

                        let deReaction = config["tickets_config"].reactionEmojiName

                        const panelEmbed = new Hyperz.MessageEmbed()
                        .setColor(config["tickets_config"].ticketPanelColorHEX)
                        .setTitle(`Create A Ticket:`)
                        .setDescription(args.join(" ") || `Simply react with ${deReaction} to create a new ticket!`)
                        .setThumbnail(config["tickets_config"].ticketPanelThumbnailURL)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                    
                        message.channel.send(panelEmbed).then(msg => msg.react(deReaction)).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);}); 

                    }
                }
        }
    },
}