import { Guild } from "discord.js";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";

export default async (bot:any) => {
    const {client, database} = bot;
    client.on('guildDelete', async (guild: Guild) => {;

        const colRef = collection(database, 'Guilds');
        const docRef = await doc(colRef, guild.id);
        deleteDoc(docRef);
        

        console.log(`Left ${guild.name}!`);
    })
}