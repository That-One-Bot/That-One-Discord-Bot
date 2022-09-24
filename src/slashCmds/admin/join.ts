import {Command} from "../../data/templates/cmdClass";
import {replyError, replySuccess} from "../../data/templates/botReplies";

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
        replySuccess(interaction, 'Emitted Join event');
    }
} as Command;