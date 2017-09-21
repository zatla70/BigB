const { RichEmbed } = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(member) {
    try{
    this.client.executeFewThing();
    let serverID = member.guild.id;
    if(this.client.serverConfig[serverID].welcomeLog === false) return;
    var byebyemsg = 
    [
        `**${member.user.tag}** is gone, Cries !!!`,
        `**${member.user.tag}** ran away seeing a :snake: :stuck_out_tongue_winking_eye:`,
        `We have lost our player **${member.user.tag}**!`,
        `We need a substitute for **${member.user.tag}**.`,
	    `Please say goodbye to **${member.user.tag}** we will miss you!`,
	    `**${member.user.tag}** left without telling bye :neutral_face: .`,
	    `I had sensed something wiered about **${member.user.tag}**`
    ] 
    var randomNumber = Math.floor(Math.random()*byebyemsg.length); 
    const embed = new RichEmbed()
    .setColor(0xE0082d)
    .setDescription(byebyemsg[randomNumber])
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.avatarURL);

    //trying to send the log detail to log channel   
    let logChannelID = this.client.serverConfig[serverID].logChannelId;
    if (logChannelID === "") return;
    if(this.client.serverConfig[serverID].logType == 1){
        try{
        member.guild.channels.get(logChannelID).send(byebyemsg[randomNumber])
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
    } catch(error) {console.log(error)}
  }
};