import { Collection, Interaction, Message, PermissionsBitField, ChatInputCommandInteraction } from 'discord.js';
import {collection, getDocs, deleteDoc} from 'firebase/firestore'
import { replyError, replySuccess } from '../data/templates/botReplies';
import ms from 'ms';
const cooldown = new Collection();

export default async (bot: any) => {
    const {client, database, sCmds, cmds, aliases} = bot;
    const devs = ['401844809385508903', '279030251995136000'];
    client.on('messageCreate', async (message: Message) => {
        const prefix = bot.prefix.get(message.guild?.id);

        if (message.author.bot) return;
        if (message.channel.type !== 0) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift()?.toLocaleLowerCase()

        if(cmd?.length == 0) return;

        let command = cmds.get(cmd)
        if(!command) command = client.commands.get(aliases.get(cmd))

        if (command) {
            if(command.cooldown) {
                if (cooldown.has(`legacy-${command.name}${message.author.id}`)) {
                    const time:any = await cooldown.get(`legacy-${command.name}${message.author.id}`);
                    const cooldownMessage = `You are currently on a \`${ms(time - Date.now(),{long : true})}s\` cooldown!`;
                    replyError(message, cooldownMessage)
                }
                if (command.userPerms || command.botPerms) {
                    if (!message.member?.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                        replyError(message, `🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
                    }
                    if(!message.guild?.members.cache.get(bot.user)?.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                        replyError(message, `🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
                    }
                }
                command.run(client, message, args)
                cooldown.set(`legacy-${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldown.delete(`legacy-${command.name}${message.author.id}`)
                }, command.cooldown)
            } else {
                if (command.userPerms || command.botPerms) {
                    if (!message.member?.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                        replyError(message, `🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
                    }
                    if(!message.guild?.members.cache.get(bot.user.id)?.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                        replyError(message, `🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
                    }
                }
                command.run(client, message, args)
            }
        }
    })
    client.on('interactionCreate', async(interaction: any) => {
        if(interaction.isCommand()) {
            const int: ChatInputCommandInteraction = interaction;
            const slashCommand:any = sCmds.get(int.commandName)

            try {
                if(slashCommand) {
                    if (slashCommand.devOnly) {
                        if (!devs.includes(interaction.user.id)){
                            replyError(interaction, 'This command is developer only!');
                            return;
                        } else if(slashCommand.cooldown) {
                            if (cooldown.has(`slash-${slashCommand.name}${int.user.id}`)) {
                                const time:any = await cooldown.get(`slash-${slashCommand?.name}${int!.user?.id}`);
                                const cooldownMessage = `You are currently on a \`${ms(time - Date.now(),{long : true})}\` cooldown!`
                                replyError(interaction, cooldownMessage)
                                return;
                            }
                            if (slashCommand.userPerms || slashCommand.botPerms) {
                                if (!interaction.member?.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                                    replyError(interaction, `🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
                                    return
                                }
                                if(!interaction.guild?.members.cache.get(bot.user.id)?.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                                    replyError(interaction, `🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
                                    return
                                }
                                return
                            }
                            slashCommand.run(bot, interaction)
                            cooldown.set(`slash-${slashCommand.name}${int.user.id}`, Date.now() + slashCommand.cooldown)
                            setTimeout(() => {
                                cooldown.delete(`${slashCommand.name}${interaction.user.id}`)
                            }, slashCommand.cooldown)
                        } else {
                            if (slashCommand.userPerms || slashCommand.botPerms) {
                                if (!interaction.member?.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                                    replyError(interaction, `🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
                                }
                                if(!interaction.guild?.members.cache.get(bot.user.id)?.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                                    replyError(interaction, `🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
                                }
                            }
                            slashCommand.run(bot, interaction)
                        }
                    } else {
                        if (!slashCommand.devOnly) {
                            if(slashCommand.cooldown) {
                                if (cooldown.has(`slash-${slashCommand.name}${int.user.id}`)) {
                                    const time:any = await cooldown.get(`slash-${slashCommand?.name}${int!.user?.id}`);
                                    const cooldownMessage = `You are currently on a \`${ms(time - Date.now(),{long : true})}\` cooldown!`
                                    replyError(interaction, cooldownMessage)
                                    return;
                                }
                                if (slashCommand.userPerms || slashCommand.botPerms) {
                                    if (!interaction.member?.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                                        replyError(interaction, `🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
                                        return
                                    }
                                    if(!interaction.guild?.members.cache.get(bot.user.id)?.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                                        replyError(interaction, `🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
                                        return
                                    }
                                    return
                                }
                                slashCommand.run(bot, interaction)
                                cooldown.set(`slash-${slashCommand.name}${int.user.id}`, Date.now() + slashCommand.cooldown)
                                setTimeout(() => {
                                    cooldown.delete(`${slashCommand.name}${interaction.user.id}`)
                                }, slashCommand.cooldown)
                            } else {
                                if (slashCommand.userPerms || slashCommand.botPerms) {
                                    if (!interaction.member?.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                                        replyError(interaction, `🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
                                    }
                                    if(!interaction.guild?.members.cache.get(bot.user.id)?.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                                        replyError(interaction, `🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
                                    }
                                }
                                slashCommand.run(bot, interaction)
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                replyError(interaction, `An error occured while executing the command!`)
            }

        }
    })
}