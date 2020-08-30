const fs = require("fs");
const Discord = require("discord.js");
const config = require("../config.json");
const request = require("request");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
module.exports = {
  name: "execute",
  description: "Executes whatever code the user specifies.",
  aliases: ["eval", "run"],
  usage: "[cmd]",
  args: true,
  execute(message, args) {
    if (message.author.id != "441384103946878987")
      return message.reply("Only developers of this bot can use that command.");
    const client = message.client;
    const clean = (text) => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    try {
      const code = args.slice(0).join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" }).then(() => {
        message.delete().catch(console.error);
      });
    } catch (err) {
      message.channel
        .send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
        .then(() => {
          message.delete().catch(console.error);
        });
    }
  },
};
