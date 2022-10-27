import { Instance } from "@/client/client";
import { GuildInfo } from "@/data/schemas/guildConfig";
import { ChatInputCommandInteraction } from "discord.js";

import { Command } from "../../data/templates/cmdClass";

export default {
    name: 'welcomechannel',
    description: 'Preview or change the welcome channel for this server',
    options: [
        {
            name: 'set',
            description: 'The new welcome channel for this server',
            type: 7,
            required: false
        },
    ],
    async run(bot: Instance, interaction:ChatInputCommandInteraction) {
        const newChannel = interaction.options.getChannel('set') ?? null;
        const guildId = interaction.guildId as string;
        const guildInfo = bot.config.get(guildId) as GuildInfo;
        let channel = guildInfo.guildConfig.welcomeChannel;

        if (newChannel === null) {
            if (channel === '') {
                interaction.reply({content: 'No welcome channel set for this server', ephemeral: true});
                return
            } else if (channel !== '') {
                interaction.reply({content: `The welcome channel for this server is <#${channel}>`, ephemeral: true});
                return
            }
        } else {
            await interaction.reply(`<a:loading:1023807644982583396> Working...`);
            const guildDb = bot.database.db('Guilds');
            const guilds = guildDb.collection(guildId);
            await guilds.updateOne({guildId: guildId}, {$set: {'guildConfig.welcomeChannel': newChannel.id}});

            bot.config.set(guildId, {
                ...bot.config.get(guildId),
                guildConfig: {
                    ...guildInfo.guildConfig,
                    welcomeChannel: newChannel.id
                }
            });
            await interaction.editReply(`Successfully changed the welcome channel for this server from <#${channel}> to ${newChannel}`);
        }
    }
} as unknown as Command