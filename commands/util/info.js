// author: floffah

const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class UtilInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: ['inf'],
            group: 'util',
            memberName: 'info',
            description: 'Возвращает инфу о указанном типе',
            details: oneLine `
           Возвращает инфу о указанном типе
			`,
            examples: ['c!info uptime'],

            args: [{
                    key: 'type',
                    label: 'type',
                    prompt: 'Какой тип информации вы хотите узнать? (бот, аптайм, сервер, пользователь)',
                    type: 'string',
                    infinite: false
                }
            ]
        });
    }

    async run(msg, args) {
      if(args.type == 'uptime') {
        let totalSeconds = (this.client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let uptime = `${hours} часов, ${minutes} минут(ы) и ${seconds} секунд`;
        msg.reply(uptime);
      }
    }
};