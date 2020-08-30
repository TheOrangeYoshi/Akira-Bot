module.exports = {
  name: "simonsays",
  description: "Causes RoboLiam to say whatever you say!",
  aliases: ["simon", "say"],
  usage: "[word(s)]",
  args: true,
  execute(message, args) {
    let msgArgs = args.slice(0).join(" ");
    message.channel.send(msgArgs).then(() => {
      message.delete().catch(console.error);
    });
  },
};
