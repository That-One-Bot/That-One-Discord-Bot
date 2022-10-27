import { TextChannel, EmbedBuilder } from 'discord.js';
import {Instance} from '@/client/client'
import { GuildInfo } from '@/data/schemas/guildConfig';

export default async (bot: Instance) => {

    bot.client.on('ready', async() => {
        const {database} = bot
        const supportGuild = bot.client.guilds.cache.get('999423826632913027')
        const readyChannel = supportGuild?.channels.cache.get('1023789951705432074') as TextChannel
        // const webhook = await readyChannel.createWebhook({
        //     name: 'Bot Ready',
        //     avatar: bot.client.user?.displayAvatarURL(),
        // })
        try {
            const data: any[] = [];
            const guilds = await database.db("Guilds");
            (await guilds.collections()).forEach(async (collection) => {
                const guild = await guilds.collection(collection.collectionName).find({}).toArray();
                for (const doc of guild) {
                    const guildInfo = doc as GuildInfo;
                    bot.config.set(guildInfo.guildId, guildInfo);
                    bot.prefix.set(guildInfo.guildId, guildInfo.guildConfig.prefix);
                }
            })
            
        } catch (error) {
            console.log(error)
        }

        console.log(`Logged in as ${bot.client.user?.tag}!`);
        bot.client.user?.setActivity('with discord.js');
        // webhook.send({embeds: [embed]});
    });
}