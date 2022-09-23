import {collection, getDocs} from 'firebase/firestore'

export default async (bot: any) => {

    bot.client.on('ready', async() => {

        try {
            const colRef = collection(bot.database, 'Guilds');

            const data: any[] = [];
            const snapshot = await getDocs(colRef);
            snapshot.docs.forEach((doc) => {
                const configData = doc.get('GuildConfig');
                bot.config.set(doc.id, configData);
                bot.prefix.set(doc.id, configData.prefix);
                data.push({id: 'GuildConfig', ...configData});
            });

            if (data.length === 0) {
                console.log('No data');
            } else {
                console.log(bot.prefix)
            }
        } catch (error) {
            console.log(error)
        }

        console.log(`Logged in as ${bot.client.user?.tag}!`);
        bot.client.user?.setActivity('with discord.js');
    });
}