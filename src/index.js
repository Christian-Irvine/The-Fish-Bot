require('dotenv').config();
const { Client, IntentsBitField, channelLink } = require('discord.js');
const tmi = require('tmi.js');

// Discord Code
const discordClient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

discordClient.on('ready', (c) => {
    console.log(`Discord: ${c.user.tag} is ready to swim!`);
});

discordClient.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    msg.reply("Howdy partner");
});

discordClient.on('interactionCreate', (interaction) => {
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

discordClient.login(process.env.DISCORD_TOKEN);

// Twitch Code
const twitchOptions = {
    identity: {
      username: process.env.TWITCH_BOT_USERNAME,
      password: `oauth:${process.env.TWITCH_OAUTH_TOKEN}`
    },
    channels: [
      process.env.TWITCH_CHANNEL_NAME
    ]
  };
  
  // Create a client with our options
  const twitchClient = new tmi.client(twitchOptions);
  
  // Register our event handlers (defined below)
  twitchClient.on('message', onMessageHandler);
  twitchClient.on('connected', onConnectedHandler);
  
  // Connect to Twitch:
  twitchClient.connect();
  
  // Called every time a message comes in
  function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
  
    // Remove whitespace from chat message
    const trimmedMessage = msg.trim();

    sendDiscordTwitchChatMessage(context['display-name'], trimmedMessage)

    // If the command is known, let's execute it
    if (trimmedMessage === '!dice') {
      const num = rollDice();
      twitchClient.say(target, `You rolled a ${num}`);
      console.log(`* Executed ${trimmedMessage} command`);
    } else {
      //console.log(`* Unknown command ${commandName}`);
    }
  }

  // Function called when the "dice" command is issued
  const rollDice = () => {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }
  
  // Called every time the bot connects to Twitch chat
  function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  const sendDiscordTwitchChatMessage = (sender, message) => {
    fullMessage = `**${sender}**: ${message}`

    chatChannel = discordClient.channels.cache.get('1248844932203155527').send(fullMessage);
  }