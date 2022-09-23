import path from 'path';
import fs from 'fs';

export default async (client: any) => {
    const cmdDir = path.join(__dirname, '../cmds');
    fs.readdirSync(cmdDir).forEach(async dir => {
        const cmdSubDir = path.join(__dirname, `../cmds/${dir}`);
        const cmdFiles = fs.readdirSync(cmdSubDir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of cmdFiles) {
            const command = await import(`../cmds/${dir}/${file}`);
            if (command) {
                client?.cmds.set(command.name, command);
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach((alias: string) => {
                        client?.aliases.set(alias, command.name);
                    });
                }
                console.log(`Loaded ${command.name}`);
            }
        };
    });
};