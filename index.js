const { Client, Collection, RichEmbed } = require('discord.js');
const {readdir} = require('fs-nextra');
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');


class LookerBOT extends Client{
    constructor(options) {
    super(options);
    this.config = require('./config.json');
    this.serverData = require('./servers.json');
    this.commands = new Collection();
    this.aliases = new Collection();
  }

capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

permLevelCal(message){
    let permLvl = 0;

    if(message.author.id === client.config.ownerID) return permLvl = 10;
    if (!message.guild || !message.member) return 0;
    // guild owner permission level
    try{
        if (message.author.id === message.guild.owner.id) permLvl = 5;
    }
    catch (error){
        console.log(error)
    }
    // guild moderator permission level
    try{
        let modRoleName;
        if(client.serverData[message.guild.id]){
            modRoleName = client.serverData[message.guild.id].modRole;
        } else {
            modRoleName = client.config.setting.modRole;
        }
        const moderator = message.guild.roles.find(r => r.name.toLowerCase() === modRoleName.toLowerCase());
        if ((moderator && message.member.roles.has(moderator.id)) || message.guild.members(message.author).hasPermission("ADMINISTRATOR")) permLvl = 3;
    }
    catch (error) {
        console.log(error)
    }
    return permLvl;

}

log(type, message, title) {
    if (!title) title = 'Log';
    console.log(`[${type}] [${title}]${message}`);
  }

serverlog(message, command){
    // this thing exists but is not used as of now
    let channel = '';
    if(message.channel.type === "dm") channel = 'DM';
    else channel = `Server: ${message.guild.name}`
    const embed = new RichEmbed()
        .setAuthor(channel)
        .setColor(3447003)
        .setDescription(`Command **${command}** used by **${message.author.username}**`)
        .setThumbnail(message.author.avatarURL)
    client.guilds.get("358098380729221133").channels.get('358098762263953408').send({embed}).catch(e => console.error(e));
}

}

const client = new LookerBOT();

const handler = async() => {

    //event handler
    const eventFiles = await readdir('./events/')
    client.log('log',`loading a total of ${eventFiles.length} events.`)

    eventFiles.forEach(file =>{
        const eventName = file.split('.')[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.execute(...args));
        client.log('log',`Loading Event ${eventName} ✔`);
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    //command handler
    const cmdFiles = await readdir('./commands/');
    client.log('log', `Loading a total of ${cmdFiles.length} commands.`);

    cmdFiles.forEach(f => {
    try {
        const props = new (require(`./commands/${f}`))(client);
        if (f.split('.').slice(-1)[0] !== 'js') return;
        client.log('log', `Loading Command: ${props.help.name}. ✔`);
        client.commands.set(props.help.name, props);
        if (props.init) props.init(client);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    } catch (e) {
        client.log(`Unable to load command ${f}: ${e}`);
    }
  });

  client.login(process.env.TOKEN);
};

handler();