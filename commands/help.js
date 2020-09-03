const configs = require('../config');

module.exports = {
	name: 'help',
	description: 'Displays available commands to interact with the NASA Ghetto Bot.',
	execute: function (message, args) {
		try {
			var map = new Map(args);
			map.delete('help');

			var outputMessage = 'Hey, it look\'s like you need some help! Available services currently include:\n\n';
			outputMessage += `> List of commands following \`${configs.bot.prefix}:\`\n`;

			for (let key of map.keys()) {
				outputMessage += `> - **${key}**: ${map.get(key).description}\n`;
			}

			outputMessage += `\nExample: \`${configs.bot.prefix} apod\``;

			message.channel.send(outputMessage);
		} catch (e) {
			message.channel.send(configs.bot.command.error);
		}
	}
}