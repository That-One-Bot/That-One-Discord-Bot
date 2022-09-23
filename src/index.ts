import bot from './client/client';  
import env from 'dotenv';
env.config();

bot().then(bot => {
    const {client} = bot;
    ['events', 'cmds', 'sCmds'].forEach(async(handler: String) => { //importing the handlers from ./{dir}/handlers/*.ts
        await import(`./handlers/${handler}`).then(async (handler: any) => await handler.default(bot)); // run client in the handler function
    });
    client.login(process.env.TOKEN);
});