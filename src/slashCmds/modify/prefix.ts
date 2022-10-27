import { Instance } from "@/client/client";
import { ChatInputCommandInteraction, Guild } from "discord.js"
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
    async run(bot: Instance, interaction: ChatInputCommandInteraction) {
        const guild = interaction.guild as Guild
        const newPrefix = interaction.options.getString('set') ?? null
        let prefix = bot.prefix.get(guild.id)
        if (newPrefix === null) {
            interaction.reply(`The current prefix for this server is \`${prefix}\``)
        } else {
            await interaction.reply(`<a:loading:1023807644982583396> Working...`)
            const guildPrefix = bot.prefix.get(guild.id)
            if (newPrefix === guildPrefix) {
                interaction.editReply(`The prefix for this server is already \`${newPrefix}\``)
                return
            }
            bot.database.db('Guilds').collection(guild.id).updateOne({ guildId: guild.id }, { $set: { 'guildConfig.prefix': newPrefix } })
            bot.prefix.set(guild.id, newPrefix)
            await interaction.editReply(`Successfully changed the prefix for this server from \`${prefix}\` to \`${newPrefix}\``)
        }
    }
} as unknown as Command