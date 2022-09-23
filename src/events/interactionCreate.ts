// import { Collection, Interaction, PermissionsBitField } from 'discord.js';
// import {client} from '../index';
// import ms from 'ms';
// import {replyError, replySuccess} from '../data/templates/botReplies';

// const cooldown = new Collection()

// client.on('interactionCreate', async (interaction: Interaction) => {
//     if (interaction.isCommand()) {
//         const command = client.commands.get(interaction.commandName);
//         if (interaction.type === 4) {
//             if(command.autocomplete) {
//                 const choices:any[] = [];
//                 await command.autocomplete(interaction, choices);
//             }
//         }
//         try{
//             if (command.cooldown) {
//                 if (cooldown.has(`slash-${command.name + interaction.user.id}`)) {
//                     return replyError(interaction, 'You are on <duration> cooldown!'.replace('<duration>', ms(cooldown?.get(`slash-${command.name + interaction.user.id}`) - Date.now(), {long: true})));
//                 }
//                 if (command.userPerms || command.botPerms) {
//                     const bot = interaction.guild!.members?.cache.get(client!.user?.id)
//                     if (!interaction!.memberPermissions?.has(PermissionsBitField.resolve(command.userPerms || []))) {
//                         return replyError(interaction, `You don't have \`${command.userPerms}\` permissions to use this command!`);
//                     }
//                     if (!bot?.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
//                         return replyError(interaction, `I don't have \`${command.botPerms}\` permissions to use this command!`);
//                     }
//                 }
//             }   
//         }catch(error){
//             replyError(interaction, "There was an error while executing this command!");
//             console.log(error)
//         }
//     }
// });

export default async (client:any) => {}