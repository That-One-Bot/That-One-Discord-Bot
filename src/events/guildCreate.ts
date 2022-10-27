import { Guild } from "discord.js";
import { Instance } from "@/client/client";
import { GuildConfig, GuildInfo } from "@/data/schemas/guildConfig";
import { ObjectId } from "mongodb";

export default async (bot:Instance) => {
    const {client, database} = bot;
    client.on('guildCreate', async (guild: Guild) => {
        const guildConfig: GuildConfig = {
            prefix: '!',
            welcomeChannel: ''
        };
        const guildInfo: GuildInfo = {
            "_id": guild.id as unknown as ObjectId,
            guildId: guild.id,
            guildName: guild.name,
            guildIcon: guild.iconURL() || 'none',
            guildOwner: guild.ownerId,
            members: guild.memberCount,
            commands: [],
            customCommands: [],
            guildConfig: {
                prefix: '!',
                welcomeChannel: ''
            }
        }
        const db = database.db('Guilds')
        const guilds = db.collection(guild.id)
        guilds.insertOne({ ...guildInfo})
        bot.config.set(guild.id, guildInfo);
        console.log(`Joined ${guild.name}!`);
    })
}