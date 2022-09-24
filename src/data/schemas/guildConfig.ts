import { Client, Message } from "discord.js";

export interface GuildConfig {
    prefix: string;
    welcomeChannel: string;
}
export interface GuildInfo {
    guildId: string;
    guildName: string;
    guildIcon: string;
    guildOwner: string;
    members: number;
    commands: any[] | undefined;
    customCommands: any[];
};

export interface GuildCommand {
    name: string;
    description: string;
    cooldown: number;
    options: any[];
    disabled: boolean;
    reply: boolean;
    run: (client: Client, message: Message) => Promise<void>;
}