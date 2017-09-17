const Command = require('../base/Command.js');

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      description: 'Provides the invite link to this server.',
      usage: 'invite',
      guildOnly: true,
      category: "Server",
      aliases: ['invit']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    message.guild.channels.get(message.channel.id).createInvite().then(invite =>  
    message.author.send(`Here is the link to the server ${message.guild.name}.\n\nBut it will expire after 24 hours so use it wisely. :smiley:` + invite.url))
    message.reply('Check your DM :thumbsup:');
  }
}
module.exports = Invite;