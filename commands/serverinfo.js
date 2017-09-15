const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

class ServerInfo extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      description: 'Displays server information & statistics.',
      usage: 'serverinfo',
      guildOnly: true,
      aliases: ['serverstats','guildinfo','guildstats','sinfo']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
      let emojiTxt = message.guild.emojis.map(e=>e.toString()).join(" ");
      if (emojiTxt === "") emojiTxt=" ----- "

      let verificationLevelTxt;
      switch (message.guild.verificationLevel){
          case 0:
          verificationLevelTxt = "none"
          break;
          case 1:
          verificationLevelTxt = "Must have verified email on the discord account."
          break;
          case 2:
          verificationLevelTxt = "Must be registered on discord for longer than 5 mins."
          break;
          case 3:
          verificationLevelTxt = "Must be member of this server for longer than 10 mins."
          break;
          case 4:
          verificationLevelTxt = "Must have a phone verified on their discord account."
      }

    const embed = new RichEmbed()
      .setAuthor(message.guild.name)
      .setColor(3447003)
      .setThumbnail(message.guild.iconURL)
      .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
      .addField('Server ID', message.guild.id, true)
      .addField('Region', message.guild.region, false)
      .addField('Member Count', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
      .addField('Members Online', message.guild.members.filter(m => ((m.user.presence.status === "online" )||(m.user.presence.status === "dnd" )||(m.user.presence.status === "idle" ))).size, true)
      .addField('Roles', message.guild.roles.size, true)
      .addField('Emojis', emojiTxt)
      .addField('Verification Level', 'In order for new members to send message in this server they must have the level:\n' +message.guild.verificationLevel + ' - __' + verificationLevelTxt + '__')
      .addField('Created', moment(message.guild.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a'), false)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL);
    message.channel.send({embed}).catch(e => console.error(e));
  }
}

module.exports = ServerInfo;