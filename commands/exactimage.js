const request = require("request");
const cheerio = require("cheerio");
module.exports = {
  name: "exactimage",
  description: "Sends a specific image of choice.",
  aliases: ["exactsearch", "esearch", "eimage"],
  usage: "[query]",
  args: true,
  execute(message, args) {
    let msgArgs = args.slice(0).join(" ");
    function image(message) {
      var options = {
        url: "https://results.dogpile.com/serp?qc=images&q=" + msgArgs,
        method: "GET",
        headers: {
          Accept: "text/html",
          "User-Agent": "Chrome",
        },
      };

      request(options, function (error, response, responseBody) {
        if (error) {
          return;
        }
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length)
          .fill(0)
          .map((v, i) => links.eq(i).attr("href"));
        if (!urls.length) {
          return;
        }
        message.channel.send(urls[0]);
      });
    }

    image(message);
  },
};
