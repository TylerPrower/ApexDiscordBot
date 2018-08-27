'use-strict'

const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const client = new commando.Client({
	owner: ['479775960603033620'],
	commandPrefix: '!',
   unknownCommandResponse: false,
    selfbot: false
});

module.exports.credits = {
  "IntelCode": "Bot Owner",
  "IntelBot": "DM support",
}
// please fill this in with your contributions.^^^


/* quick.db start */
const express = require('express');
const app = express();
app.use(express.static('public'));
const db = require('quick.db');
db.createWebview('password', 3000);
client.on('ready', () => {
});
var bot;
/* - quick.db emd */


client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  setInterval(() => {
    client.user.setActivity(`${client.users.size} users in ${client.guilds.size} servers!`, { type: 'WATCHING' });
    setTimeout(() => {
      client.user.setActivity(`| !help -| V.10.3`, { type: 'WATCHING' });
    }, 30000);
  }, 60000)
})
	.on('disconnect', () => { console.warn('Отключено!'); })
	.on('reconnecting', () => { console.warn('Переподключение..'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
 .on('guildMemberAdd', (member) => {
   //whoever put a setpresence here is off their nut, scroll up to the ready event
	})
.on('guildMemberRemove', (member) => {
  //whoever put a setpresence here is off their nut, scroll up to the ready event
	})


client.registry
  .registerGroups([
        ['admin', 'Admin'],
        ['mod', 'Moderation'],
      /*This is telling you what the name of the location is where comnands is already included.>>>*/ ['util', 'Utility'], /*<<<This is telling you what will be displayed at the help*/
        ['search', 'Search'],
        ['fun', 'Fun'],
        ['owner', ':no_entry: Bot Owner :no_entry:']
    ])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

Music.start(client, {
  prefix: client.commandPrefix,
  maxQueueSize: "10",
  disableLoop: true,
  helpCmd: 'help',
  leaveCmd: 'leave',
  ownerOverMember: true,
  botOwner: '479775960603033620',
  youtubeKey: 'AIzaSyB6uwpzmPj3gp5IEEfFAhq3XtQmX6PPJF4',
  enableQueueStat: true
});

client.login(process.env.TOKEN);