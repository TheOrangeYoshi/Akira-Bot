module.exports = {
  name: "ban",
  description:
    "Bans the specified user for a specified reason, for a specified amount of time.\nSet `[days]` to 0 for permban.",
  aliases: ["banish"],
  usage: "[mention] [days] <reason>",
  args: true,
  guildOnly: true,
  permission: "BAN_MEMBERS",
  execute(message, args) {
    const member = message.guild.member(message.mentions.users.first());

    if (member) {
      if (args[1]) {
        const matches = args[1].match(/(\d+)/);
        if (matches) {
          let days;
          if (matches[0] == 0) {
            days = `ever`;
          } else {
            days = ` ${matches[0]} day(s)`;
          }

          if (args[2]) {
            let msgArgs = args.slice(2).join(" ");
            member
              .ban({ days: matches[0], reason: msgArgs })
              .then(() => {
                message.reply(
                  `✅ Succesfuly banned ${member.user.tag} for "${msgArgs}" for${days}.`
                );
              })
              .catch((err) => {
                message.channel.send(
                  `❌ I was unable to ban the user ${member.user.tag}.`
                );
                console.log(err);
              });
          } else {
            member
              .ban({ days: matches[0] })
              .then(() => {
                message.reply(
                  `✅ Succesfuly banned ${member.user.tag} for${days}.`
                );
              })
              .catch((err) => {
                message.channel.send(
                  `❌ I was unable to ban the user ${member.user.tag}.`
                );
                console.log(err);
              });
          }
        } else {
          message.channel.send(
            `Please use a number to specify how long you'd like to ban ${member.user.tag} for.`
          );
        }
      } else {
        message.channel.send(
          `Please specify how long you'd like to ban ${member.user.tag} for.`
        );
      }
    } else {
      message.channel.send(
        "I couldn't find the user you requested in this server!"
      );
    }
  },
};
