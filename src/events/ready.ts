import { TextChannel, EmbedBuilder } from 'discord.js';
import {collection, getDocs} from 'firebase/firestore'

export default async (bot: any) => {

    bot.client.on('ready', async() => {
        const supportGuild = bot.client.guilds.cache.get('999423826632913027')
        const readyChannel = supportGuild?.channels.cache.get('1023789951705432074') as TextChannel
        // const webhook = await readyChannel.createWebhook({
        //     name: 'Bot Ready',
        //     avatar: bot.client.user?.displayAvatarURL(),
        // })
        const embed = new EmbedBuilder()
            .setTitle('Bot Ready')
            .setDescription('The bot is now ready to use')
            .setColor('Green')
            .setTimestamp()
        try {
            const colRef = collection(bot.database, 'Guilds');

            const data: any[] = [];
            const snapshot = await getDocs(colRef);
            snapshot.docs.forEach((doc) => {
                const configData = doc.get('GuildConfig');
                bot.config.set(doc.id, configData);
                bot.prefix.set(doc.id, configData.prefix);
            });
        } catch (error) {
            console.log(error)
        }

        console.log(`Logged in as ${bot.client.user?.tag}!`);
        bot.client.user?.setActivity('with discord.js');
        // webhook.send({embeds: [embed]});
    });
}