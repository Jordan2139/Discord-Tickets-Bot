const fs = require('fs');

module.exports = async(client, Hyperz, config, reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch();

    try {

        if (config["tickets_config"].useTicketReactions) {

            if (config["tickets_config"].reactionPanelMessageID === `${reaction.message.id}`) {

                const guild = client.guilds.cache.get(config["main_config"].yourserverid);

                if (reaction.message.guild.id === config["main_config"].yourserverid) {

                    if (reaction.emoji.name === `${config["tickets_config"].reactionEmojiName}`) {

                        if (user.bot) {

                        } else {

                            reaction.users.remove(user.id);
                            if (reaction.message.guild.id === config["main_config"].yourserverid) {

                                const origin = reaction.message
                                let everyoneRole = reaction.message.guild.roles.cache.find(role => role.name === "@everyone");
                                let permissionOverwriteArray = [{
                                        id: user.id,
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
                                    let yeet = reaction.message.guild.roles.cache.get(role);
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
                                let hello = await guild.channels.create(`ticket-${user.username}`, {
                                    type: 'text',
                                    permissionOverwrites: permissionOverwriteArray
                                }).catch(e => {

                                    if (e) console.log(`I was not able to make a channel in  ${message.guild.id} || ${message.guild.name}`);
                                    origin.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); })
                                }).then(chan => {
                                    if (config["tickets_config"].usecategory = true) {
                                        chan.setParent(config["tickets_config"].ticketscategoryid, { lockPermissions: false })
                                        const ticketchannelembed2 = new Hyperz.MessageEmbed()
                                            .setColor(config["main_config"].colorhex)
                                            .setTitle(`Ticket:`)
                                            .setURL(`${config["other_configuration"].serverinvite}`)
                                            .setThumbnail(config["tickets_config"].ticketThumbnailURL || user.avatarURL())
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
                                        chan.overwritePermissions(permissionOverwriteArray)
                                    } else {
                                        chan.overwritePermissions(permissionOverwriteArray)
                                        const ticketchannelembed2 = new Hyperz.MessageEmbed()
                                            .setColor(config["main_config"].colorhex)
                                            .setTitle(`Ticket:`)
                                            .setURL(`${config["other_configuration"].serverinvite}`)
                                            .setThumbnail(config["tickets_config"].ticketThumbnailURL)
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
                                    }
                                })
                                if (hello == undefined) return;
                                message.delete().catch(e => { if (config["main_config"].debugmode) return console.log(e); });

                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        if (config["main_config"].debugmode) return console.log(e);
    }
}