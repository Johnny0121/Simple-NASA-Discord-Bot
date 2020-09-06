const https = require('https');
const configs = require('../config');
const Discord = require('discord.js');

module.exports = {
    name: 'NeoWs',
    description: 'Asteroids NeoWs (Near Earth Object Web Service): Retrieves near earth Asteroid information. The service retrieves asteroids based on their closest approach date to Earth.',
    execute: function (message, args) {
        let date = new Date().toISOString().slice(0, 10);
        let endDate = new Date().toISOString().slice(0, 10);

		try {
            if (args.length >= 1) {
                date = args[0];
            }

            https.get(`${configs.api.neows.endpoint}?start_date=${date}&end_date=${date}&api_key=${process.env.NASA_API_KEY}&feedtype=json&ver=1.0`, response => {
                let data = '';

                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', () => {
                    data = JSON.parse(data);

                    if (data.element_count) {
                        const embedResponse = new Discord.MessageEmbed();

                        let description = '';
                        let fields = [];

                        Object.keys(data.near_earth_objects).forEach(function (key, index) {
                            description += `**${key}**: ${data.near_earth_objects[key].length} objects found\n`
                            fields.push({
                                name: key,
                                value: data.near_earth_objects[key].map(asteroid => `- **Name**: ${asteroid.name} (ID: ${asteroid.id})\n(JPL: ${asteroid.nasa_jpl_url})`).join('\n')
                            });
                        });

                        embedResponse.setColor('#124494')
                            .setAuthor('Asteroid NeoWs', 'https://yt3.ggpht.com/a/AATXAJyjhPLjpkZ54OWzkeD3n6AwZNZE-AigHF_d7PU_kb0=s900-c-k-c0xffffffff-no-rj-mo')
                            .setTitle(`${data.element_count} Near Earth Objects Found`)
                            .setDescription(description)
                            .setTimestamp()
                            .setFooter('NeoWs Service')
                            .addFields(fields)
                            .addField({ name: 'REST Call'})


                        message.channel.send(embedResponse);
					}
                });
            }).on('error', err => {
                message.channel.send(`${configs.api.downtime}`);
            });
        } catch (e) {
            message.channel.send(e);
		}
    }
};