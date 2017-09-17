module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(guild) {
    await this.client.guilds.get("358098380729221133").channels.get('358098762263953408').send(`I just left the server **${guild.name}**`).catch(e => console.error(e));
    await this.client.user.setGame(`${this.client.config.setting.prefix}help | ${this.client.guilds.size} Servers`);
    serverData[guild.id] = {
            prefix : "!",
            modRole : "moderator",
            serverLog : 0,
            logType : 0,
            logchannel : ""
        }
  }
};