import { Collection, Message, PermissionsBitField } from 'discord.js';
import {collection, getDocs, deleteDoc} from 'firebase/firestore'
import { replyError } from '../data/templates/botReplies';
import ms from 'ms'
const cooldown = new Collection();

export default async (bot:any) => {
    const {client, database, cmds, aliases} = bot;
    
}
