import {Client, Collection, GatewayIntentBits, PermissionsBitField} from 'discord.js';
import * as env from 'dotenv';
import { MongoClient, MongoClientEvents } from 'mongodb';
import dbInit from './dbClient';
env.config();

const bot = async() => {
    const dbClient = await dbInit();

    const client: Instance = {
        client: new Client({
            intents: [ //List all the intents that are needed for the bot to work
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildEmojisAndStickers
            ],
        }),
        sCmds: new Collection<string, object>(),
        cmds: new Collection<string, object>(),
        aliases: new Collection<string, object>(),
        customCmds: new Collection<string, object>(),
        buttons: new Collection(),
        config: new Collection<string, object>(),
        prefix: new Collection<string, string>(),
        database: await dbClient.connect(),
    }

    return client;
}

export default bot;
export interface Instance {
    client: Client;
    sCmds: Collection<string, object>;
    cmds: Collection<string, object>;
    aliases: Collection<string, object>;
    customCmds: Collection<string, object>;
    buttons: Collection<string, object>;
    config: Collection<string, object>;
    prefix: Collection<string, string>;
    database: MongoClient
}