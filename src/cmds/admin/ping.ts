import { Client, Message } from "discord.js";

module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	cooldown: 3000,
	run: async (client: Client, message: Message, args: string[]) => {
		const msg = await message.reply('Pinging...')
		await msg.edit(`🏓 Latency is **${(Date.now() - message.createdTimestamp)}ms**. API Latency is **${Math.round(client.ws.ping)}ms**`)
	}
};