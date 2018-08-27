// author: floffah, franklin the turtle

const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class MuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['m'],
            group: 'mod',
            memberName: 'mute',
            description: "Закрывает рот пользователю на указанное время",
            details: oneLine `
            Закрывает рот пользователю на указанное время
			`,
            examples: ['!mute @ExampleUser#1234 "Причина"'],
            args: [{
                    key: 'member',
                    label: 'member',
                    prompt: 'Какому участнику вы хотите закрыть рот?',
                    type: 'member',
                    infinite: false
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'Почему вы захотели закрыть ему рот?',
                    type: 'string',
                    infinite: true
                }
            ]
        });
    }

    async run(msg, args) {
        if (msg.author.bot) return;
        if (!msg.member.hasPermission("MANAGE_MESSAGES") && msg.author.id !== '221524691079266314') {
            msg.channel.send("Ошибка!! У вас недостаточно разрешений!!");
            return;
        }
        let muterole = msg.guild.roles.find(`name`, "Muted");
        if (!muterole) {
            msg.channel.send("Ошибка!! Пожалуйста, создайте роль 'Muted'");
            return;
        }

        args.member.addRole(muterole)
            .catch(console.error);

        msg.channel.send(`Успешно закрыт рот участнику ${args.member}. Причина: ${args.reason}.`);
    }
};