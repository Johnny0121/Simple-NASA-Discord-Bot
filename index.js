// Imports
require('dotenv').config();
const Configs = require('./config.js');
const Discord = require('discord.js');
const FileSystem = require('fs');

// Variables and props
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = FileSystem.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${Configs.bot.name} is ready to roll!`);
})

client.on('message', message => {
    if (!message.content.toUpperCase().startsWith(Configs.bot.prefix) || message.author.bot) return;

    const args = message.content.slice(Configs.bot.prefix.length + 1).split(' ');
    const command = args.shift().toLowerCase();

    console.log({ args, command });

    if (command == null || command.length <= 0) {
        message.channel.send(Configs.bot.introduction);
    } else if (client.commands.has(command)) {
        //client.commands.get(command).execute(message, args);
        message.channel.send(`Command: ${command}, Args: ${args}`);
    } else {
        message.channel.send(Configs.bot.command.error);
    }
});


client.login(process.env.DISCORD_BOT_TOKEN);
