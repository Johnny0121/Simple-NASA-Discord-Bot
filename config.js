var config = {
    bot: {
        name: 'NASA Bot',
        prefix: '/NASA',
        introduction: 'Hi, NASA Ghetto Bot here! To get started, call \`/nasa help\` for a list of available commands to interact with external NASA systems.',
        command: {
            error: 'Hey sorry! Something doesn\'t look right with that command. For a list of available commands, call \`/nasa help\`.'
        }
    },
    api: {
        base_endpoint: 'https://api.nasa.gov',
        apod: {
            endpoint: 'https://api.nasa.gov/planetary/apod',
            method: 'GET'
        },
        downtime: 'Oh no, it seems like there is downtime for the current service you\'re trying to interact with. Please try again at a later time!'
    }
};

module.exports = config;