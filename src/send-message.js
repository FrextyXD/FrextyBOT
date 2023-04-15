require("dotenv").config();
const {  Client,  IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
    {
        id: '1095972339402932245',
        label: 'FrextyGPT'
    },
    {
        id: '1096020600482439249',
        label: 'FrextyBOT'
    },
]

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get('1096738164086943746');
    if (!channel) return;


    const row = new ActionRowBuilder();

    roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        )
    })

    await channel.send({
        content: 'Claim or remove a role.',
        components: [row]
    })
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
