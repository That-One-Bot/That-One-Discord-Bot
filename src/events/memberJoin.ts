import { Interaction } from "discord.js";

export default async (bot: any, interaction: Interaction) => {
    const {client, database, config} = bot;
    client.on('guildMemberAdd', async (member: any) => {
        const guildId = member.guild.id;
        const guildConfig = config.get(guildId);

        if (guildConfig.welcomeChannel === '') {
            console.log('No welcome channel set for ' + member.guild.name);
            return
        } else if (guildConfig.welcomeChannel !== '') {
            const channel = member.guild.channels.cache.get(guildConfig.welcomeChannel);
            channel.send(`Welcome to ${member.guild.name}, ${member.user.tag}!`);
        }
    })
}