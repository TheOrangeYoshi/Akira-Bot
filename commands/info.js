const { MessageEmbed } = require("discord.js");
const { version, dependencies } = require("../package.json");
module.exports = {
  name: "info",
  description: "Sends info about the bot.",
  aliases: ["botinfo", "bot", "links"],
  execute(message, args) {
    const client = message.client;

    let serverCount;
    client.guilds.cache.tap((coll) => {
      serverCount = coll.size;
    });

    let channelCount;
    client.channels.cache.tap((coll) => {
      channelCount = coll.size;
    });

    let userCount;
    client.users.cache.tap((coll) => {
      userCount = coll.size;
    });

    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const Embed = new MessageEmbed()
      .setAuthor(
        "Made by TheBoredScripter#9129",
        "https://cdn.discordapp.com/attachments/721002714687078510/742421402895777862/download_1.png",
        "http://github.com/Controlfreak707/"
      )
      .setTitle("Bot Info")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/721002714687078510/742419757801799760/08e09480-db3b-11e9-8daa-175b74a05b92.jpg"
      )
      .setFooter("Made with Discord.js.", "https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .addFields([
        { name: "Servers", value: serverCount, inline: true },
        { name: "Channels", value: channelCount, inline: true },
        { name: "Users", value: userCount, inline: true },
        { name: "Bot Version", value: version, inline: true },
        {
          name: "Discord.js Version",
          value: dependencies["discord.js"],
          inline: true,
        },
        {
          name: "Uptime",
          value: `${days}d, ${hours}h, ${minutes}m, ${Math.round(seconds)}s`,
          inline: true,
        },
        {
          name: "Ping",
          value: `${Math.round(client.ws.ping)} ms`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Invite",
          value:
            "[Invite Me](https://discordapp.com/api/oauth2/authorize?client_id=742164363456151584&permissions=8&scope=bot)",
        },
        { name: "Support", value: "[Join](https://discord.gg/QFMjF2j)" },
        {
          name: "Github",
          value: "[Click Here](https://github.com/Controlfreak707/RoboLiam)",
        },
        {
          name: "top.gg",
          value: "[Click Here](https://top.gg/bot/694637394300895273)",
        },
        {
          name: "discord.bots.gg",
          value:
            "[Click Here](https://discord.bots.gg/bots/694637394300895273)",
        },
      ]);

    message.channel.send(Embed);
  },
};
