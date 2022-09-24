import {Command} from "../../data/templates/cmdClass";

export default {
    name: 'leave',
    description: 'Emits a Leave event',
    options: [
        {
            name: 'user',
            description: 'The user to emit the leave event for (defaults to you)',
            type: 6,
            required: false,
        },
    ],
    devOnly: true,
    run(bot: any, interaction) {
        const user = interaction.options.getMember('user') || interaction.member;

        bot.client.emit('guildMemberRemove', user);
        interaction.reply('Emitted Leave event');
    }
} as Command;