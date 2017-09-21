const { RichEmbed } = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(member) {
    this.client.executeFewThing();
    let serverID = member.guild.id;
    if(this.client.serverConfig[serverID].welcomeLog === false) return;
    var welcomemsg = 
    [
        `**${member.user.tag}**, if our dog doesn't like you, we won't either !`,
        `Come in **${member.user.tag}**, We are awesome :stuck_out_tongue_winking_eye: !!`,
        `You look hot **${member.user.tag}** :kissing:`,
        `**${member.user.tag}**, Around here NORMAL is just a setting on the Dryer.`,
        `**${member.user.tag}**, Welcome to the Porch... where wasting time is considered.`,
        `**${member.user.tag}**, be WISE ... **Dont DRINK & DRIVE** !!`,
        `Welcom Tursit **${member.user.tag}**, We SPIK INGLISH.`,
        `Oh NO, Not you again **${member.user.tag}**`,
        `**${member.user.tag}**, DOORBELL BROKEN! Yell __"DING DONG"__ Loudly.`,
        `Yay! you made it **${member.user.tag}**, Now the party can start.`,
        `I'm already disturbed, Please come in **${member.user.tag}**.`,
        `**${member.user.tag}**, Forget the DOGS ... **BEWARE OF KIDS** :stuck_out_tongue_winking_eye:`,
        `**${member.user.tag}**, **SIT LONG**, **TALK MUCH**, **LAUGH OFTEN**`
    ] 
    var randomNumber = Math.floor(Math.random()*welcomemsg.length);
    const embed = new RichEmbed()
    .setColor(0x66CC00)
    .setDescription(welcomemsg[randomNumber])
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.avatarURL);

    //trying to send the log detail to log channel   
    let logChannelID = this.client.serverConfig[serverID].logChannelId;
    if (logChannelID === "") return;
    if(this.client.serverConfig[serverID].logType == 1){
        try{
          member.guild.channels.get(logChannelID).send(welcomemsg[randomNumber])
    }catch(errror) {
         console.log(errror)
        }
    } else if(this.client.serverConfig[serverID].logType == 2){
        try{
          member.guild.channels.get(logChannelID).send({embed}).catch(err => console.error(err));
        }catch(errror) {
         console.log(errror)
        }
    }
  }
};