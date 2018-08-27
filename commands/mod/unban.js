// author: floffah

const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ModUnbanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            aliases: ['mod-unban'],
            group: 'mod',
            memberName: 'unban',
            description: 'Разбанивает указанного пользователя',
            details: oneLine `
              Разбанивает указанного пользователя
			`,
            examples: ['!unban 1234567890 "это причина"'],

            args: [{
                    key: 'member',
                    label: 'member',
                    prompt: 'Какого участника вы хотите разбанить?',
                    type: 'string',
                    infinite: false
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'Почему вы хотите разбанить его?',
                    type: 'string',
                    infinite: true
                }
            ]
        });
    }

    async run(msg, args) {
        msg.guild.unban(args.member, args.reason)
            .catch(console.error);
            msg.reply(`Я разбанил **${args.member}** потому что "**${args.reason}**"!`)
    }
};