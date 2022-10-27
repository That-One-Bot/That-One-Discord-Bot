import { Guild } from "discord.js";
import {Instance} from '@/client/client'

export default async (bot:Instance) => {
    const {client, database} = bot;
    client.on('guildDelete', async (guild: Guild) => {;
        const guilds = database.db("Guilds")
        await guilds.dropCollection(guild.id)

        console.log(`Left ${guild.name}!`);
    })
}