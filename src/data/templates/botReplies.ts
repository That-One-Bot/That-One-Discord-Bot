import { EmbedBuilder, Interaction } from "discord.js";

export const replySuccess = async(interaction: any, message: string) => {
    const embed = new EmbedBuilder()
        .setTitle("Success")
        .setDescription(message)
        .setColor(6356824)
        .setTimestamp();
   await interaction.reply({ embeds: [embed], ephemeral: true})
};
export const replyError = async(interaction: any, message: string) => {
    const embed = new EmbedBuilder()
        .setTitle("Error!")
        .setDescription(message)
        .setColor(16711680)
        .setTimestamp();
    
   await interaction.reply({embeds: [embed], ephemeral: true})
};