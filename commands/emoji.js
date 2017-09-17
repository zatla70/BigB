const Command = require('../base/Command.js');

class Emoji extends Command {
  constructor(client) {
    super(client, {
      name: 'emoji',
      description: 'Displays all the emojis of the server.',
      usage: 'emoji',
      category: "Server",
      guildOnly: true
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    message.channel.send(emojiList);
  }
}
module.exports = Emoji;