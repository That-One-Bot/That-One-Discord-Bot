import { Guild } from "discord.js";
import { doc, setDoc } from "firebase/firestore";
import { GuildConfig, GuildInfo } from "../data/schemas/guildConfig";

export default async (bot:any) => {
    const {client, database} = bot;
    client.on('guildCreate', async (guild: Guild) => {
        const guildConfig: GuildConfig = {
            prefix: '!',
            welcomeChannel: ''
        };
        const guildInfo: GuildInfo = {
            guildId: guild.id,
            guildName: guild.name,
            guildIcon: guild.iconURL() || undefined,
            guildOwner: guild.ownerId,
            members: guild.memberCount,
            commands: [],
            customCommands: [],
        }
        const infoDoc = doc(database, "Guilds", guild.id);
        setDoc(infoDoc, {
            ...guildInfo,
            GuildConfig: {...guildConfig}
        });

        bot.config.set(guild.id, guildConfig);

        console.log(`Joined ${guild.name}!`);
    })
}