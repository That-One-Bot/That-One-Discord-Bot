import { Message } from 'discord.js';
import {deleteDoc, doc} from 'firebase/firestore'

export default async (bot:any) => {
    const {client, database} = bot;
    client.on('messageDelete', async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === 1) return;

        const docRef = doc(database, '999423826632913027', message.id);
        deleteDoc(docRef);
    })
}
