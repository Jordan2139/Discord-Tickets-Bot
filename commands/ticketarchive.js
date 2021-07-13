// Thanks Braxton
const { MessageEmbed, MessageAttachment } = require(`discord.js`);
const ms = require('ms')
const fs = require(`fs`);
module.exports = {
    name: 'ticketarchive',
    description: 'A command.',
    aliases: ['transcript', 'archiveticket', 'archive'],
    async execute(client, message, args, Hyperz, config) {

        if(message.guild.id === config["main_config"].yourserverid) {

        if (!message.channel.name.includes(`ticket`)) return message.reply(`You can only run this command in a ticket channel!`).then(a => a.delete({ timeout: 5000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.channel.send(`Please confirm that you wish to archive this ticket.`).then(balls => {
            balls.react('✅').then(() => balls.react('❌'));
            const johncena = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.bot == false;
            };
            balls.awaitReactions(johncena, { max: 1, time: ms("25m") }).then(collected => {
                const react23847 = collected.first();
                if (react23847.emoji.name === '✅') {
                    message.channel.send(`Ticket successfully archived! (Please wait)`)

                    var messages = {};
                    var members = ``;
                    message.channel.messages.fetch({ limit: 100, before: message.id }).then(async(collected) => {
                        message.channel.delete(`Ticket closed`).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                        collected.forEach(async(msg) => {
                            messages[msg.id] = {
                                author: { tag: msg.author.tag, id: msg.author.id },
                                content: msg.content || `Unknown`
                            };
                            try {
                                messages[msg.id].image = msg.attachments.array()[0].url;
                            } catch (e) {e => {if(config["main_config"].debugmode) return console.log(e);}};
                            if (msg.embeds[0]) {
                                messages[msg.id].embeds = {
                                    title: msg.embeds[0].title,
                                    description: msg.embeds[0].description
                                };
                            };
                            if (!members.includes(msg.author.tag)) members += msg.author.tag + `\n`;
                        });
                        if (members == ``) members = `Unknown`;

                        var embed = new MessageEmbed()
                            .setFooter(message.guild.name, message.guild.iconURL())
                            .setColor(`${config["main_config"].colorhex}`)
                            .setAuthor(`Ticket Closed`)
                            .addFields({
                                name: `Ticket ID`,
                                value: message.channel.name.replace(`ticket-`, ``),
                                inline: true
                            }, {
                                name: `Closing Member`,
                                value: `${message.author}`,
                                inline: true
                            }, {
                                name: `Members in Ticket`,
                                value: members,
                                inline: true
                            });

                        if (config["logging_config"].enable_ticketarchive_logging) {
                            var logger = ``;

                            await Object.keys(messages).reverse().forEach(msg => {
                                if (messages[msg].image == undefined) {
                                    if (messages[msg].embeds) {
                                        logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n• Embed: \n    TITLE: ${messages[msg].embeds.title}\n    DESCRIPTION: ${messages[msg].embeds.description}\n\n`;
                                    } else {
                                        logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n\n`;
                                    }
                                } else {
                                    if (messages[msg].embeds) {
                                        logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n• Image: ${messages[msg].image}\n• Embed: \n    TITLE: ${messages[msg].embeds.title}\n    DESCRIPTION: ${messages[msg].embeds.description}\n\n`;
                                    } else {
                                        logger += `[${messages[msg].author.tag} (${messages[msg].author.id})]\n• Content: ${messages[msg].content}\n• Image: ${messages[msg].image}\n\n`;
                                    }
                                }
                            })
                            await fs.writeFileSync(`./util/ticket.txt`, logger);
                            const attach = new MessageAttachment(`./util/ticket.txt`, `${message.channel.name}.txt`);
                            embed.attachFiles(attach);
                            config["logging_config"].ticketarchive_logging_channels.forEach(chan => {

                                const thechannel = client.channels.cache.get(chan)
                                if (!thechannel) {
                                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    thechannel.send(embed)
                                }

                            });
                        }
                    })

                    setTimeout(() => {
                        message.channel.delete();
                    }, 8000);
                }
                if (react23847.emoji.name === '❌') {
                    return message.channel.send(`Cancelling ticket archive process.`).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }
            })
        }).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    } else {
        message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
    }
}