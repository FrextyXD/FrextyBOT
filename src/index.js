require('dotenv').config();
const { Client, IntentsBitField, ActivityType, } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');

    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();


let status = [
  {
    name: 'Made by Frexty',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/channel/UCO-gNm_jXmaSO8GkiJeZ9RA',
  },
  {
    name: 'varter.eu',
  },
  {
    name: 'Best fn acc!',
    type: ActivityType.Watching,
  },
  {
    name: 'FrextyBOT!!!!',
    type: ActivityType.Listening,
  },
];
client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.login(process.env.TOKEN);
