const https = require('https');
const configs = require('../config');
const Discord = require('discord.js');

module.exports = {
	name: 'apod',
	description: 'APOD (Astronomoney Picture of the Day): Retrieves a unique daily image/photograph of our fascinating universe, from NASA\'s API, accompanied with a brief explanation of written by a professional astronomer.',
    execute: function (message, args) {
        https.get(`${configs.api.apod.endpoint}?api_key=${process.env.NASA_API_KEY}`, response => {
            let data = '';

            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                data = JSON.parse(data);

                if (data.hdurl) {
                    const embedResponse = new Discord.MessageEmbed();

                    embedResponse.setColor('#124494')
                        .setAuthor('Astronomy Picture of the Day', 'https://yt3.ggpht.com/a/AATXAJyjhPLjpkZ54OWzkeD3n6AwZNZE-AigHF_d7PU_kb0=s900-c-k-c0xffffffff-no-rj-mo')
                        .setTitle(data.title)
                        .setURL(data.hdurl)
                        .setDescription(data.explanation)
                        .setImage(data.hdurl)
                        .setTimestamp()
                        .setFooter('NASA APOD Service');

                    message.channel.send(embedResponse);
                }
            });
        }).on('error', err => {
            message.channel.send(`${configs.api.downtime}`);
        });
	}
}