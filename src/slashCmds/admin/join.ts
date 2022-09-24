import {Command} from "../../data/templates/cmdClass";

export default {
    name: 'join',
    description: 'Emits a join event',
    options: [
        {
            name: 'user',
            description: 'The user to emit the join event for (defaults to you)',
            type: 6,
            required: false,
        },
    ],
    devOnly: true,
    run(bot: any, interaction) {
        const user = interaction.options.getMember('user') || interaction.member;

        bot.client.emit('guildMemberAdd', user);
        interaction.reply('Emitted join event');
    }
} as Command;