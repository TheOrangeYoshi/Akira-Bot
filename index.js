require("dotenv").config();
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const { prefix } = require("./config.json");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Akira#7948 is now online.");

  const status = [
    {
      activity: 'Say ".help" for cmds!',
      type: "PLAYING",
    },
    {
      activity: "With Code.",
      type: "PLAYING",
    },
    {
      activity: "Minecraft.",
      type: "PLAYING",
    },
    {
      activity: "Naruto.",
      type: "WATCHING",
    },
    {
      activity: "LoFi Music.",
      type: "LISTENING",
    },
    {
      activity: "Cute Boys.",
      type: "WATCHING",
    },
  ];
  const random = status[Math.floor(Math.random() * Math.floor(status.length))];
  client.user.setActivity(random.activity, {
    type: random.type,
  });
  setInterval(async function () {
    client.user.setActivity(random.activity, {
      type: random.type,
    });
  }, 60000);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.reply(reply);
  }

  if (command.permission) {
    if (
      !message.guild.member(message.author).hasPermission(command.permission)
    ) {
      return message.reply(
        `You don't have permission to do that!\nYou need to be able to \`${command.permission}\` to run this command.`
      );
    }
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command!");
  }
});

client.login(process.env.TOKEN);
