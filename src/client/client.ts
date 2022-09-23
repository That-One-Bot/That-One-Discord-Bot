import {Client, Collection, GatewayIntentBits, PermissionsBitField} from 'discord.js';
import env from 'dotenv';
import dbInit from './dbClient';
env.config();

const bot = async() => {
    const dbClient = await dbInit();

    const client = {
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
        sCmds: new Collection(),
        cmds: new Collection(),
        aliases: new Collection(),
        buttons: new Collection(),
        config: new Collection(),
        prefix: String,
        database: dbClient,
    }

    return client;
}

export default bot;