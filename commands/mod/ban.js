const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ModBanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['mod-ban'],
            group: 'mod',
            memberName: 'ban',
            description: 'Bans the mentioned user',
            details: oneLine `
                Банит выбранного пользователя
			`,
            examples: ['!ban @ExampleUser#1234 1 "это причина"'],

            args: [{
                    key: 'member',
                    label: 'member',
                    prompt: 'Какого участника вы хотите забанить?',
                    type: 'member',
                    infinite: false
                },
                {
                    key: 'amount',
                    label: 'amount',
                    prompt: 'На сколько вы хотите его забанить?',
                    type: 'integer',
                    infinite: false
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'Почему вы хотите его забанить?',
                    type: 'string',
                    infinite: true
                }
            ]
        });
    }

    async run(msg, args) {
        if(args.member.bannable) {
        args.member.ban(7, args.amount, args.reason)
            .catch(console.error);
            msg.reply(`Я забанил **${args.member}** потому что он(а) "**${args.reason}**" на **${args.amount}** дней!`)
        } else {
            msg.reply(`Простите, я не могу забанить данного пользователя, т.к. он выше моей роли..`);
        }
    }
};