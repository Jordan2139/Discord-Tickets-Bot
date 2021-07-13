const pagination = require('discord.js-pagination')
const { setSizeDependencies } = require('mathjs')

module.exports = {
    name: 'help',
    description: 'Shows all commands for the bot.',
    aliases: ['helpmenu', 'helpme'],
    async execute(client, message, args, Hyperz, config){

        const page1 = new Hyperz.MessageEmbed()
        .setTitle(`${client.user.username} Help Menu`)
        .setColor(`${config["main_config"].colorhex}`)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setURL(`${config["other_configuration"].serverinvite}`)
        .addFields(
            {name: `Bot Name:`, value: `\`${client.user.username}\``, inline: true},
            {name: `Bot Prefix:`, value: `\`${config["main_config"].prefix}\``, inline: true},
            {name: `Server Owner:`, value: `${message.guild.owner.user.tag}`, inline: true},
            {name: `Copyright:`, value: `${config["main_config"].copyright}\n \n`, inline: true},
        )
        .setTimestamp()
        
        const page2 = new Hyperz.MessageEmbed()
        .setTitle(`User Commands`)
        .setColor(`${config["main_config"].colorhex}`)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription("`creator` - Learn who made the bot.\n`help` - Get a list of everything you need to know.\n`ping` - Check to see if the bot is online.\n`invite` - Get an invite to the server.\n`version` - Learn what the current version of the bot is.")
        .setTimestamp()

        const page3 = new Hyperz.MessageEmbed()
        .setColor(`${config["main_config"].colorhex}`)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription("**Ticket Commands:**\n`new` - Open a new ticket.\n`close` - Close a ticket.\n`archive` - Archive a ticket.\n\n**Support Commands:**\n`intro` - Introduce yourself.\n`outro` - Outroduce yourself.\n`claim` - Claim a ticket.\n`Unclaim` - Unclaim a ticket.\n\n**Admin Commands:**\n`panel` - Create a ticket reaction panel.")
        .setTimestamp()

        const page4 = new Hyperz.MessageEmbed()
        .setTitle(`Bot Credits`)
        .setColor(`${config["main_config"].colorhex}`)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, 'https://hyperz.dev/')
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .addFields(
            {name: `Programming:`, value: "`Hyperz#0001` - Head Developer of the HypeBot Project."},
        )
        .setTimestamp()

        const pages = [
            page1,
            page2,
            page3,
            page4
        ]

        const emoji = ["⬅️", "➡️"]

        const timeout = '100000'

        pagination(message, pages, emoji, timeout)

        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
}