module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute(message) {
        // escaping if the message is run by bot
        if (message.author.bot) return;

        //calculating level of the user
        const level = this.client.permLevelCal(message);

        // checking for direct bot mention
        if (message.content.match(new RegExp(`^<@!?${this.client.user.id}>$`))) {
            let mentionMsg = '';
            mentionMsg = `The prefix is \`${this.client.config.setting.prefix}\`.`;
            return message.channel.send(mentionMsg);
        }

        // checking for server specific prefix
        var prefixes = '';
        let prefix = false;
        if(message.channel.type === "dm"){
            prefix = this.client.config.setting.prefix;
        } else {            
            if(this.client.serverData[message.guild.id]){
                prefixes = [this.client.config.setting.prefix, this.client.serverData[message.guild.id].prefix];
            } else {
                prefixes = [this.client.config.setting.prefix];
            }            
            for(const thisPrefix of prefixes) {
                if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
            }
        }

        if(!prefix) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (cmd && !message.guild && cmd.conf.guildOnly)
            return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
        if (cmd && level >= cmd.conf.permLevel) {
            message.flags = [];
            while (args[0] && args[0][0] === '-') {
                message.flags.push(args.shift().slice(1));
            }
            this.client.log('log', `${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, 'CMD');
            //this.client.serverlog(message, cmd.help.name);
            //this.client.guild.channels.get(this.client.config.setting.botChannel).send(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name} in ${message.guild.name} - ${message.channel.name}`)
            cmd.run(message, args, level).catch(error => {
                message.channel.send(error);
            });
        }
    }
}