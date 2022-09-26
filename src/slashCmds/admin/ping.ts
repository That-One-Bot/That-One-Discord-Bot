import { Command } from "../../data/templates/cmdClass";

export default {
    name: 'ping',
    description: 'Pings the bot',
    cooldown: 10,
    options: [],
    run(bot:any, interaction) {
        interaction.reply(`🏓 Latency is **${-(Date.now() - interaction.createdTimestamp)}ms**. API Latency is **${Math.round(bot.client.ws.ping)}ms**`)
        console.log('Ping command executed')
    },
} as Command;