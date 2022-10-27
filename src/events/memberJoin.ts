import { Instance } from "@/client/client";
import { GuildConfig, GuildInfo } from "@/data/schemas/guildConfig";
import { CategoryChannel, Channel, GuildMember, Interaction, TextChannel, User } from "discord.js";

export default async (bot: Instance) => {
    const {client, config} = bot;
    client.on('guildMemberAdd', async (member: GuildMember) => {
        const guild = member.guild
        const guildInfo = config.get(guild.id) as GuildInfo;

        if (guildInfo.guildConfig.welcomeChannel === '') {
            console.log('No welcome channel set for ' + member.guild.name);
            return
        } else if (guildInfo.guildConfig.welcomeChannel !== '') {
            const channel = guild.channels.cache.get(guildInfo.guildConfig.welcomeChannel) as TextChannel;
            channel.send(`Welcome to ${member.guild.name}, ${member.user.tag}!`);
        }
    })
}