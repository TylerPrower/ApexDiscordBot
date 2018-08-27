//author: floffah

const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ModKickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['mod-kick'],
            group: 'mod',
            memberName: 'kick',
            description: 'Кикает выбранного пользователя',
            details: oneLine `
            Кикает выбранного пользователя
			`,
            examples: ['!kick @ExampleUser#1234 "это причина"'],

            args: [{
                    key: 'member',
                    label: 'member',
                    prompt: 'Какого участника вы хотите кикнуть?',
                    type: 'member',
                    infinite: false
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'За что вы хотите его кикнуть?',
                    type: 'string',
                    infinite: true
                }
            ]
        });
    }

    async run(msg, args) {
        if (args.member.kickable) {
            args.member.kick()
                .catch(console.error);
            msg.reply(`Я кикнул **${args.member}** потому что "**${args.reason}**"!`)
        } else {
            msg.reply(`Простите, я не могу кикнуть данного пользователя, т.к. он выше моей роли..`);
        }
    }
};