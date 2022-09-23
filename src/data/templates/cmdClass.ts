import { Client, PermissionsBitField } from "discord.js";

export interface Command { //Command Type for creation commands
    name: string;
    description: string;
    options?: any;
    defaultPermission?: boolean;
    default_member_permissions?: PermissionsBitField;
    testOnly?: boolean;
    ownerOnly?: boolean;
    cooldown?: number;
    run: (client: Client, interaction: any) => Promise<void>;
}