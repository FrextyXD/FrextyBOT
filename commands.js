let status = [
  {
    name: "varter.eu", 
    type: ActivityType.Watching,
  },
  {
    name: "Made by Frexty", 
  },
  {
    name: "Best fn acc!",
    type: ActivityType.Competing,
  },
]
client.on("ready", (c) => {
    console.log(`✔${c.user.tag} is online!`);
  
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000);
  });
  
  client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === "embed") {
      const embed = new EmbedBuilder()
        .setTitle("Embed title")
        .setDescription("This is an embed description")
        .setColor("Random")
        .addFields(
          {
            name: "Fuild title",
            value: "Some random value",
            inline: true,
          },
          {
            name: "2nd Fuild title",
            value: "Some random value",
            inline: true,
          }
        );
  
      interaction.reply({ embeds: [embed] });
    }
  });
  
  client.on("messageCreate", (message) => {
    if (message.content === "skam") {
      const embed = new EmbedBuilder()
      .setTitle("Skam?")
      .setDescription("Read rules before u say skam.")
      .setColor('DarkRed')
      .addFields(
        {
          name: "It says:",
          value: "you purchase at your own risk the accounts that are provided are checked and once they are given I have absolutely no fault if something happens to them",
          inline: true,
        },
        {
          name: "SO dont think that we are skam",
          value: "Read the rules first :D",
          inline: true,
        }
      );
  
      message.channel.send({ embeds: [embed] });
    }
  
  });
  
  client.on('interactionCreate', async (interaction) => {
    try {
      if (!interaction.isButton()) return;
      await interaction.deferReply({ ephemeral: true });
      
        const role =interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {
          interaction.editReply({
            content: "I couldn't find that role",
          })
          return;
        }
      
        const hasRole = interaction.member.roles.cache.has(role.id);
        if (hasRole) {
          await interaction.member.roles.remove(role);
          await interaction.editReply(`The role ${role} has been removed.`);
          return;
        }
      
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);
    } catch (error) {
      console.log(error)
    }
  })