//Author: The Infinity Corporation™ 2018

const commando = require('discord.js-commando');
const Discord = require("discord.js");
const oneLine = require('common-tags').oneLine;

module.exports = class ChangestatusCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'changestatus',  
			aliases: ['setstatus', 'ss'],
			group: 'owner',
			memberName: 'changestatus',
            description: 'Изменяет статус Элвина.',
            details: oneLine `
            Изменяет статус Элвина.
            `,
          ownerOnly: true,
            examples: ['!>setstatus online'],
            args: [{
               key: 'status',
                label: 'status',
                prompt: 'Какой статус вы хотите ему установить?',
                type: 'string',
              default: 'Online'
            }
                ]
        });
    }
 async run(msg, { status }) {
   if(msg.author.bot) return;
   msg.delete(1);
     let stat = status.toLowerCase();
     let minusonemembers = this.client.users.size - 1
    if(stat === 'online' || stat === 'idle' || stat === 'dnd' || stat === 'invisible') {
    this.client.user.setStatus(stat).then(console.log).catch(console.error);
   let doneembed = new Discord.RichEmbed()
   .setTitle(`:white_check_mark: Успешно изменено!`)
   .setDescription(`Успешно установлено статус Элвина на ${stat}\nЭто может занять несколько секунд`)
   .setColor('RANDOM')
   .setFooter("Powered by Tyler Prower")
   .setTimestamp(new Date());
    msg.channel.send(doneembed);
    } else {
     let invalidembed = new Discord.RichEmbed()
     .setTitle(`:warning: Ошибка :warning:`)
     .setDescription('Пожалуйста, введите правильный статус.')
     .setColor(0xff0000)
     .setFooter("Powered by Tyler Prower")///Leave this, this command is gifted to Phantom from Infinity :D
    .setTimestamp(new Date());
    return msg.channel.send(invalidembed);
   }
 }
}