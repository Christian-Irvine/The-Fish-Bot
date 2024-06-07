require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'twitch',
        description: "Gets the link to my twitch page!"
    },
    {
        name: 'youtube',
        description: "Gets the link to my youtube channel!"
    },
    {
        name: 'discord',
        description: "Gets the link to my discord channel!"
    },
    {
        name: 'vod',
        description: "Gets the link to my vod channel!"
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log("Successfully registered slash commands!");
    } 
    catch (error) {
        console.warn(`There was an error: ${error}`);
    }
})();