const Command = require('../base/Command.js');

class Invite2 extends Command {
  constructor(client) {
    super(client, {
      name: 'invite2',
      description: "Messages the user with the bot's OAuth2 invite link.",
      usage: 'invite2',
      category:'Support'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{
        message.author.send('Hmmm, Want to add me to some other server ??\nTake this link then :smiley:\nhttps://discordapp.com/oauth2/authorize?client_id=358103340686770176&scope=bot&permissions=2146958591');
        if(message.channel.type !== "dm") message.reply('Check your DM :thumbsup:');
    }catch(error) {console.log(error)}
  }
}
module.exports = Invite2;