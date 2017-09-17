const Command = require('../base/Command.js');

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      description: 'Kicks a mentioned user',
      usage: 'kick <mention> [reason]',
      aliases: ['boot', 'throw'],
      category: "Moderation",
      guildOnly: true,
      permLevel: 3
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars

    let member = message.mentions.members.first();
    if (!member) return message.reply('Invalid command usage, You must mention someone to use this command.');
    if (!member.kickable) return message.channel.send(`:unamused: You cant kick **${member.user.username}**`);

    let reason = args.slice(1).join(" ");
    member.kick(reason);
    //const settings = this.client.settings.get(message.guild.id);
    //const channel = message.guild.channels.exists('name', settings.modLogChannel);
    //if (!channel) return message.reply(`Cannot find the \`${settings.modLogChannel}\` channel.`);
    //await this.buildModLog(this.client, message.guild, 'k', target, message.author, reason);
    await message.channel.send('beaned!');
  }
}

module.exports = Kick;