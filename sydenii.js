/* Note :
Picture Attachment : 
let generalChannel = client.channels.cache.get("717722775388946543")
    const hosting = new Discord.MessageAttachment("picture link")
    generalChannel.send("", hosting) */

    const Discord = require("discord.js");
    const client = new Discord.Client();
    
    //status
    client.on("ready", () => {
      console.log(client.user.username + " is online bitches!\n");
      console.log("Current Servers\n");
    
      //activity below
    
      //change bot Status
      setInterval(() => {
        var RAN = [
          `My Creation`,
          `${client.guilds.cache.size} servers`,
          "~commands",
          "~help"
        ];
        client.user.setActivity(RAN[~~(Math.random() * RAN.length)], {
          type: "WATCHING"
        });
      }, 25000);
    
      //connected Server list below
      client.guilds.cache.forEach(guild => {
        console.log(guild.id + "\t" + guild.memberCount + "\t" + guild.name);
        //connected Server's permitted channel
        guild.channels.cache.forEach(channel => {
          //console.log(` -${channel.name} ${channel.type} ${channel.id}`)
        });
      });
    
      // This event triggers when the bot joins a guild.
      client.on("guildCreate", guild => {
        console.log(
          `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
        );
      });
    
      //hosting message below
      let generalChannel = client.channels.cache.get("728902343634190336");
      const hostembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Syden Hosting Now!")
        .setTimestamp();
      generalChannel.send(hostembed);
    });
    
    //trigger messaging below :
    client.on("message", receivedMessage => {
      if (receivedMessage.channel.type == "dm") return;
      //Fixed this, need to block all bot inputs
      if (receivedMessage.author.bot) return;
        //commands prefix below
      if (receivedMessage.content.startsWith("$")) {
        processCommand(receivedMessage);
      }
    });

    function processCommand(receivedMessage) {
      let fullCommand = receivedMessage.content.substr(1);
      let splitCommand = fullCommand.split(" ");
      let primaryCommand = splitCommand[0];
      let arguments = splitCommand.slice(1);
      let content = primaryCommand.toLowerCase();
      
      //ping command input
       if (content == "ping")
       {
            pingCommand(arguments, receivedMessage)
        }
        
      //default
      else 
      {
        receivedMessage.channel.send("Check the List of Valid Commands by typing '~commands' \nAll commands are case insentitive.");
      }
    }
    
    //ping command here
    function pingCommand(arguments, receivedMessage)
    {
        receivedMessage.reply("Pong!")
    }
        
        //login token below
    client.login("NzE4NTAxMTUyMDg1MjQ1OTkz.XxRS0A.y7QtGetgNm1alQYh_OtMbDGyaEo");
    

