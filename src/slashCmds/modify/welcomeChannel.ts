import { setDoc, doc, collection } from "firebase/firestore";
import { Command } from "../../data/templates/cmdClass";

export default {
    name: 'welcomechannel',
    description: 'Preview or change the welcome channel for this server',
    options: [
        {
            name: 'set',
            description: 'The new welcome channel for this server',
            type: 7,
            required: false,
        },
    ],
    async run(bot: any, interaction) {
        const colRef = collection(bot.database, 'Guilds');
        const guildId = interaction?.guild.id as string
        const newChannel = interaction.options.getChannel('set') ?? null
        let channel = bot.config.get(guildId)?.welcomeChannel
        if (newChannel === null) {
            interaction.reply(`The current welcome channel for this server is <#${channel}>`)
        } else {
            await interaction.reply(`<a:loading:1023807644982583396> Working...`)
            const docRef = doc(bot.database, 'Guilds', guildId)
            await setDoc(docRef, {
                GuildConfig: {
                    welcomeChannel: newChannel.id
                }
            }, { merge: true })
            bot.config.set(guildId, {
                ...bot.config.get(guildId),
                welcomeChannel: newChannel.id
            })
            await interaction.editReply(`Successfully changed the welcome channel for this server from <#${channel}> to ${newChannel}`)
        }
    }
} as Command