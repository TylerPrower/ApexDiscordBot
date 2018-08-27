const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class PurgeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: ['purge', 'delete'],
            group: 'mod',
            memberName: 'clear',
            description: "Удаляет выбранное количество сообщений.",
            details: oneLine `
            Удаляет выбранное количество сообщений.
			`,
            examples: ['!clear 5'],
            args: [
				{
					key: 'count',
					label: 'amount of messages',
					prompt: 'Сколько сообщений вы хотите удалить?(макс. 200 за раз)',
					type: 'integer',
					min: 1,
					max: 200
				}
			]
    });
}

    async run(msg, args) {
        if(msg.author.bot) return;
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.send("Ошибка!! У вас нет разрешения на это!!");
            return;
        }
        const msgs = await msg.channel.fetchMessages({ limit: args.count + 1 });
        msg.channel.bulkDelete(msgs).then(() => {
            msg.channel.send(`:white_check_mark: Очищено ${args.count} сообщений`).then(msg => msg.delete(2000))
        });
    }
};