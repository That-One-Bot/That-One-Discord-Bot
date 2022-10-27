import { Message } from 'discord.js';


export default async (bot:any) => {
    const {client, database} = bot;
    client.on('messageDelete', async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === 1) return;
    })
}
