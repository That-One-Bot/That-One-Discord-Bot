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
};