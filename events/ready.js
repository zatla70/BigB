module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute() {
        this.client.log('log', `Logged in as ${this.client.user.username} and I'm ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, 'Ready!');
        await this.client.user.setGame(`${this.client.config.setting.prefix}help | ${this.client.guilds.size} Servers`);
    }
}