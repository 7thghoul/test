 //help command input
      if (content == "help") {
        helpCommand(arguments, receivedMessage);
      }
      //play command input
      else if (content == "play" || content == "p")
        {
            if (!receivedMessage.member.voice.channel)
            return receivedMessage.reply("You need to be in a voice channel!");
            else {
                    distube.play(receivedMessage, arguments.join(" "));
                 }
        }
         else if (["repeat", "loop"].includes(content))
    {
    if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            
        distube.setRepeatMode(receivedMessage, parseInt(arguments[0]));
        receivedMessage.react('🔁');
     }
        
        else if (content == "skip" || content == "s")
        {
            if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("The queue is empty!")
            }
            else
            {
              distube.skip(receivedMessage);
              receivedMessage.react("⏭");
            }
        }
        
        //jump command begins here
        else if (content == "jump" || content == "j")
        {
            if (!receivedMessage.member.voice.channel)
            {
              return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            else if (arguments.length == 0 || isNaN(arguments))
            {
              return receivedMessage.reply("Please mention the song number from the queue!")
            }
            else 
            {
              let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              return receivedMessage.reply("The queue is empty!")
            }
            else if (arguments > queue.songs.length || arguments < 1)
            {
              return receivedMessage.reply("Not found!")
            }
            else if (arguments == 1)
            {
              return receivedMessage.reply("Already Playing!")
            }
            else
            {
              distube.jump(receivedMessage, (arguments-1))
              receivedMessage.channel.send("Jumped!")
            }
          }
        } //jump command ends here
        
        //pause command begins here
        else if (content == "pause")
        {
            if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("I'm not playing any song!")
            }
            else
            {
              distube.pause(receivedMessage)
              receivedMessage.react('⏸');
            }
        } //pause command ends here
        
        //resume command begins here
        else if (content == "resume")
        {
            if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("There's no song i can resume playing!")
            }
            else
            {
              distube.resume(receivedMessage)
              receivedMessage.react('⏯');
            }
        } //resume command ends here
 
   //stop command begins here
    else if (content == "stop") 
    {
      if (!receivedMessage.member.voice.channel)
        {
          return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
        }
        let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("No song to stop!")
            }
            else
            {    
        distube.stop(receivedMessage);
        receivedMessage.react('⏹');
            }
      } //stop command ends here
 
        //queue command begins here
    else if (content == "queue" || content == "q")
    {       
        let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("The queue is empty!")
            }
            else
            {
              receivedMessage.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
              `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n"))
            }
    } //queue command ends here
    
    //shuffle command begins here
    else if (content == "shuffle")
    {
    if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("The queue is empty!")
            }
            else
            {    
        distube.shuffle(receivedMessage)
        receivedMessage.react('🔀');
            }
    } //shuffle command ends here
    
    //volume command begins here
    else if (content == "volume" || content == "v" || content == "vol")
    {
    if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("The queue is empty!")
            }
            else
            {
        if (arguments.toString()>0 && arguments.toString()<51)
        { receivedMessage.react('🔈'); }
        else if (arguments.toString()>50 && arguments.toString()<101)
        { receivedMessage.react('🔉'); }
        else if (arguments.toString()>100 && arguments.toString()<201)
        { receivedMessage.react('🔊'); }
        else {return receivedMessage.react('❌')}
        distube.setVolume(receivedMessage, arguments)
            }
      } //volume command ends here
    
    //filter command begins here
    else if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(content))
    {
    if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
            let queue = distube.getQueue(receivedMessage);
            if (!queue)
            {
              receivedMessage.reply("The queue is empty!")
            }
            else
            {
        let filter = distube.setFilter(receivedMessage, content);
        receivedMessage.channel.send("Current queue filter: " + (filter || "Off"));
            }
    } //filter command ends here
        
      //aniplay command input
       if (content == "aniplay" || content == "ap")
       {
            if (!receivedMessage.member.voice.channel)
            {
                receivedMessage.delete ({ timeout: 6000 })
                return receivedMessage.channel.send("You need to be in a voice channel")
                .then(msg => {msg.delete({ timeout: 5000 }) })
            }
            else {
              receivedMessage.reply("You have tuned into the Anime Radio.. Ara ara")
              aniplayCommand(arguments, receivedMessage)}
        }
      //anistop command input
       else if (content == "anistop" || content == "as")
       {
            if (!receivedMessage.member.voice.channel)
            {
                receivedMessage.delete ({ timeout: 6000 })
                receivedMessage.reply("You need to be in my voice channel to do so!")
                .then(msg => {msg.delete({ timeout: 5000 }) })
            }
            else{
              receivedMessage.react('💤')
              anistopCommand(arguments, receivedMessage)
        }
       }
      //image command input
      else if (content == "image") {
        imageCommand(arguments, receivedMessage);
      }
        
        //join command begins here
    else if (content == "join")
    {
      if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("Join a voice channel first!")
            }
      receivedMessage.member.voice.channel.join();
    } //join command ends here

    //leave command begins here
    else if (content == "leave")
    {
      if (!receivedMessage.member.voice.channel)
            {
                return receivedMessage.reply("You must be in the same voice channel as mine to do so.")
            }
      receivedMessage.member.voice.channel.leave();
    } //leave command ends here
        
        //clan command input
      else if (content == "clan") {
        clanCommand(arguments, receivedMessage);
      }
      //getsyden input
      else if (content == "getsyden") {
        getsydenCommand(arguments, receivedMessage);
      }
      // invite command input
      else if (content == "invite") {
        inviteCommand(arguments, receivedMessage);
      }
        //anicom command input
        else if (content == "anicom")
        {
            anicomCommand(arguments, receivedMessage);
        }
      //kick command input
      else if (content == "kick") {
        kickCommand(arguments, receivedMessage);
      }
      //warlog command input
      else if (content == "warlog") {
        warlogCommand(arguments, receivedMessage);
      }
      //ban command input
      else if (content == "ban") {
        banCommand(arguments, receivedMessage);
      }
      //google command input
      else if (content == "google") {
        googleCommand(arguments, receivedMessage);
      }
        //dic command input
      else if (content == "dic" || content == "dictionary") 
      {
        if (arguments.length == 0)
        {
          return receivedMessage.reply("Please mention your query followed by command")
        }
        dicCommand(arguments, receivedMessage);
      }
      //wiki command input
      else if (content == "wiki") {
        wikiCommand(arguments, receivedMessage);
      }
         //coc command input
       else if (content == "coc") {
        cocCommand(arguments, receivedMessage);
      }
      //listban command input
      else if (content == "listban") {
        listbanCommand(arguments, receivedMessage);
      }
      //anifind command input
      else if (content == "anifind") {
        anifindCommand(arguments, receivedMessage);
      }
        //translate command input
        else if (content == "t" || content == "tr" || content == "translate")  
      {
        translateCommand(arguments, receivedMessage)
      }
      //aniurl command input
      else if (content == "aniurl") {
        aniurlCommand(arguments, receivedMessage);
      }
      //aniep command input
      else if (content == "aniep") {
        aniepCommand(arguments, receivedMessage);
      }
      //unban command input
      else if (content == "unban") {
        unbanCommand(arguments, receivedMessage);
      }
      //report command input
      else if (content == "report") {
        reportCommand(arguments, receivedMessage);
      }
      //info command input
      else if (content == "info") {
        infoCommand(arguments, receivedMessage);
      }
      //fact command input
      else if (content == "fact") {
        factCommand(arguments, receivedMessage);
      }
      //purgeserver command input
      else if (content == "purgeserver") {
        purgeserverCommand(arguments, receivedMessage);
      }
      //findclan command input
      else if (content == "findclan") {
        findclanCommand(arguments, receivedMessage);
      }
        //funcom command input
       else if (content == "funcom") {
        funcomCommand(arguments, receivedMessage);
      }
      //clanmem command input
      else if (content == "clanmem") {
        clanmemCommand(arguments, receivedMessage);
      }
      //cwl command input
      else if (content == "cwl") {
        cwlCommand(arguments, receivedMessage);
      }
      //ping command input
      else if (content == "ping") {
        pingCommand(arguments, receivedMessage);
      }
      //uptime command input
      else if (content == "uptime") {
        uptimeCommand(arguments, receivedMessage);
      }
      //commands command input
      else if (content == "commands" || content == "command") {
        commandsCommand(arguments, receivedMessage);
      }
      //gif command input
      else if (content == "gif") 
      { return
        //gifCommand(arguments, receivedMessage);
      }
      //playcom input
      else if (content == "playcom") {
        //PLAY COMMANDS COMMAND DECLARATION
        playcomCommand(arguments, receivedMessage);
      }
      //mod commands input
      else if (content == "modcom") {
        modcomCommand(arguments, receivedMessage);
      } else if (content == "anime") {
        animeCommand(arguments, receivedMessage);
      } else if (content == "aninews") {
      aninewsCommand(arguments, receivedMessage);
      }
