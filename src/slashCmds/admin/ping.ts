import { Command } from "../../data/templates/cmdClass";

export default {
    name: 'ping',
    description: 'Pings the bot',
    cooldown: 10000,
    options: [],
    run(client, interaction) {
        interaction.reply(`🏓 Latency is **${-(Date.now() - interaction.createdTimestamp)}ms**. API Latency is **${Math.round(client.ws.ping)}ms**`);
    },
} as Command;