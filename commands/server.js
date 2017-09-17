const Command = require('../base/Command.js');

class Server extends Command {
  constructor(client) {
    super(client, {
      name: 'server',
      description: 'Gives the link to the official server of BigB',
      usage: 'server',
      category:'Support'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    this.client.channels.get('358098700175802370').createInvite().then(invite =>  
    message.author.send(`Here you wanted a invite link to the official server of **${this.client.user.username}** right ??\n\nThis invite link will last only for 24 hours. Make sure you use it properly.\n` + invite.url))
    if(message.channel.type !== "dm") message.reply('Check your DM :thumbsup:');
  }
}
module.exports = Server;