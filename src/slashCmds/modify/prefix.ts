import { ChatInputCommandInteraction } from "discord.js"
import { collection, setDoc, doc } from "firebase/firestore";
import { replySuccess } from "../../data/templates/botReplies"
import { Command } from "../../data/templates/cmdClass"
export default {
    name: 'prefix',
    description: 'Preview or change the prefix for this server',
    options: [
        {
            name: 'set',
            description: 'The new prefix for this server',
            type: 3,
            required: false,
        },
    ],
    async run(bot: any, interaction) {
        const colRef = collection(bot.database, 'Guilds');
        const guildId = interaction?.guildId as string
        const newPrefix = interaction.options.getString('new_prefix') ?? null
        let prefix = bot.prefix.get(interaction.guild?.id)
        if (newPrefix === null) {
            interaction.reply(`The current prefix for this server is \`${prefix}\``)
        } else {
            await interaction.reply(`<a:loading:1023807644982583396> Working...`)
            const docRef = doc(bot.database, 'Guilds', guildId)
            await setDoc(docRef, {
                GuildConfig: {
                    prefix: newPrefix
                }
            }, { merge: true })
            bot.prefix.set(guildId, newPrefix)
            await interaction.editReply(`Successfully changed the prefix for this server from \`${prefix}\` to \`${newPrefix}\``)
        }
    }
} as Command