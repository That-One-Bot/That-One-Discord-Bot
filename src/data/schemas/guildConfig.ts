import { Client, Message } from "discord.js";
import { ObjectId } from "mongodb";

export interface GuildConfig {
    prefix: string;
    welcomeChannel: string;
}
export interface GuildInfo {
    _id: ObjectId;
    guildId: string;
    guildName: string;
    guildIcon: string;
    guildOwner: string;
    members: number;
    commands: any[] | undefined;
    customCommands: any[];
    guildConfig: GuildConfig;
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