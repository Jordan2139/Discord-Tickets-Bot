/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/

module.exports = {
    name: 'ticketopen',
    description: 'A command.',
    aliases: ['new', 'newticket', 'ticket'],
    async execute(client, message, args, Hyperz, config) {

        if (message.guild.id === config["main_config"].yourserverid) {

            const origin = message
            let everyoneRole = message.guild.roles.cache.find(role => role.name === "@everyone");
            let permissionOverwriteArray = [{
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: everyoneRole.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: client.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
            ]
            config.permissions_config.ticketmanagers.forEach(role => {
                let yeet = message.guild.roles.cache.get(role);
                if (!yeet) {
                    console.log(`${role} is not in the server`)
                } else {
                    let tempArray = {
                        id: role,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }
                    permissionOverwriteArray.push(tempArray);
                }
            })
            let hello = await message.guild.channels.create(`ticket-${message.author.username}`, {
                type: 'text',
                permissionOverwrites: permissionOverwriteArray
            }).catch(e => {

                if (e) console.log(`I was not able to make a channel in  ${message.guild.id} || ${message.guild.name}`);
                origin.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); })
            }).then(chan => {
                if (message.content.includes(" ")) {
                    if (config["tickets_config"].usecategory = true) {
                        chan.setParent(config["tickets_config"].ticketscategoryid, { lockPermissions: false })
                        chan.overwritePermissions(permissionOverwriteArray)
                    }
                    chan.setTopic(`Ticket for ${message.author.username}`)
                    const ticketchannelembed = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`Ticket:`)
                        .setURL(`${config["other_configuration"].serverinvite}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription(config["tickets_config"].newticketmessage)
                        .addFields({ name: 'Reason:', value: `${args.join(" ")}` }, )
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                    if (config.tickets_config.mentions) {
                        if (config.tickets_config.mentionid) {
                            config.tickets_config.mentionid.forEach(role => {
                                message.channel.send(`<@${role}>`).catch(e => { if (config["main_config"].debugmode) return console.log(e); });
                            })
                        } else {
                            console.log('HEY RETARD, IF YOU WANT ME TO PING YOU WHEN I CREATE A TICKET YOU GOTTA FUCKIN GIVE ME A ROLE TO MENTION! MONKEY!')
                        }
                    }
                    chan.send(ticketchannelembed)
                    message.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); });
                } else if (message.content = `${config["main_config"].prefix}ticket`) {
                    chan.setParent(config["tickets_config"].ticketscategoryid)
                    chan.overwritePermissions(permissionOverwriteArray)
                    chan.setTopic(`Ticket for ${message.author.username}`)
                    const ticketchannelembed2 = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`Ticket:`)
                        .setURL(`${config["other_configuration"].serverinvite}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription(config["tickets_config"].newticketmessage)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                    if (config.tickets_config.mentions) {
                        if (config.tickets_config.mentionid) {
                            config.tickets_config.mentionid.forEach(role => {
                                message.channel.send(`<@${role}>`).catch(e => { if (config["main_config"].debugmode) return console.log(e); });
                            })
                        } else {
                            console.log('HEY RETARD, IF YOU WANT ME TO PING YOU WHEN I CREATE A TICKET YOU GOTTA FUCKIN GIVE ME A ROLE TO MENTION! MONKEY!')
                        }
                    }
                    chan.send(ticketchannelembed2)
                    message.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); });
                }
                message.channel.send(`Your new ticket has been opened in <#${chan.id}>`).then(msg => msg.delete({ timeout: 30000 })).catch(e => { if (config["main_config"].debugmode) return console.log(e); })
            })
            if (hello == undefined) return;
            message.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); });
        } else {
            message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => { console.log(e) })
            message.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); });
        }
    }
}

/* Credits:
 Physical Programming: Hyperz#0001
 Im horny lol - Jordan.#2319
 buy me redbull lol - https://cash.app/$j2139 | https://paypal.me/jordan2139
*/