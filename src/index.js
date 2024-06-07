require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is ready to swim!`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    msg.reply("Howdy partner");
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    switch (interaction.commandName) {
        case 'twitch':
            interaction.reply("Looking for my Twitch I see... Ah here it is! [twitch](https://www.twitch.tv/craftymcfish)");
            break;
        case 'youtube':
            interaction.reply("Oh I see you are interested in Youtube, that ones just over here! [youtube](https://www.youtube.com/craftymcfish)");
            break;
        case 'discord':
            interaction.reply("I mean you are already here but I guess you can have it [discord](https://discord.gg/9fEMRF6rxG)");
            break;
        case 'vod':
            interaction.reply("Oh twitch deleted the VOD you wanted, good thing I saved it! [vods](https://www.youtube.com/channel/UCariIlK6BJ26hVc_JybFwZAh)");
            break;

    }
    
});

client.login(process.env.TOKEN);