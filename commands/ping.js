module.exports = {
  name: "ping",
  description: "Displays the bot's ping.",
  execute(message, args) {
    const { ws } = message.client;
    message.channel.send(`Ping: ${ws.ping} ms`);
  },
};
