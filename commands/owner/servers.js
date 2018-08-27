const commando = require('discord.js-commando');
const Discord = require("discord.js");
const oneLine = require('common-tags').oneLine;

module.exports = class ChangestatusCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'listguilds',
           aliases: ['listservers', 'guilds', 'listallguilds', 'listallservers', 'serverlist'],
			      group: 'owner',
			      memberName: 'listguilds',
            description: 'See the servers Flux is on.',
            details: oneLine `
           See the servers Flux is on.
            `,
            ownerOnly: true,
            examples: [',serverlist'],
        });
    }
 async run(msg, { guild }) {
   if(msg.author.bot) return;
   if(!guild) {
   let embed = new Discord.RichEmbed()
				.setTitle('Servers Flux Is On')
			  .setColor('RANDOM')
        .setFooter(`${this.client.guilds.size} Servers`)
  // for (const servers of this.client.guilds.map) {
        embed.setDescription('**'+this.client.guilds.map(g => g.name).join('\n')+'**' || 'None')
 //  }
   msg.channel.send({embed});
   }
 }
}