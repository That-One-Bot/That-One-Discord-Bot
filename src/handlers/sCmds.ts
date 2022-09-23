import { Client, PermissionsBitField, Routes } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import {REST} from '@discordjs/rest'
dotenv.config();
const token = process.env.TOKEN ? process.env.TOKEN : "";
const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : "";
const guildId = process.env.TEST_ID ? process.env.TEST_ID : "";

const rest = new REST({version: '10'}).setToken(token);

export default async(client: any) => {
    const commands: object[] = [];
    const cmdDir: string = path.join(__dirname, '../slashCmds');
    fs.readdirSync(cmdDir).forEach(async dir => {
        const cmdSubDir: string = path.join(__dirname, `../slashCmds/${dir}`);
        const cmdFile = fs.readdirSync(cmdSubDir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of cmdFile) {
            const cmdFile = await import(`../slashCmds/${dir}/${file}`);
            const filterCmd = cmdFile.default;
            commands.push(filterCmd);
            client?.sCmds.set(filterCmd.name, filterCmd);
            console.log(`Loaded ${filterCmd.name}`);
        };

        (async () => {
			try {
				await rest.put(
					process.env.GUILD_ID ?
					Routes.applicationGuildCommands(clientId, guildId) :
					Routes.applicationCommands(clientId), 
					{ body: commands }
				);
				console.log('Slash Commands • Registered')
			} catch (error) {
				console.log(error);
			}
	    })();
    });
};