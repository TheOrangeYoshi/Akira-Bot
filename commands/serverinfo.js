const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "serverinfo",
  description: "Sends info about the server you are currently on.",
  aliases: ["guildinfo", "guild", "server"],
  guildOnly: true,
  execute(message, args) {
    const d = new Date(message.guild.createdTimestamp);
    let day;
    let month;
    if (d.getDate() < 10) {
      day = `0${d.getDate()}`;
    } else {
      day = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
      month = `0${d.getMonth() + 1}`;
    } else {
      month = d.getMonth();
    }

    const guild = message.guild;

    const Embed = new MessageEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL())
      .addFields([
        { name: "Owner", value: `<@${guild.ownerID}>`, inline: true },
        { name: "Region", value: guild.region, inline: true },
        { name: "Members", value: guild.memberCount, inline: true },
        { name: "Highest Role", value: guild.roles.highest, inline: true },
      ])
      .setFooter(
        `ID: ${guild.id} | Server Created • ${day}/${month}/${d.getFullYear()}`
      );

    message.channel.send(Embed);
  },
};
