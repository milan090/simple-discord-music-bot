const Discord = require('discord.js');
const {
  prefix,
  token
} = require('./config.json');
const ytdl = require('ytdl-core-discord');
const { getYoutubeVideoInfo } = require('./youtube');


const client = new Discord.Client();
const songConstruct = {
  connection: null,
  volume: 5,
  songs: [],
  playing: false
}

client.once('ready', () => {
  console.log("Ready");
})

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member.voice.channel) return message.reply("You need to be connected to a voice channel first!");
  
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift();
  const songName = args.join(' ');
  
  switch (command) {
    case "play":
      const songInfo = await getYoutubeVideoInfo(songName);
      
      if (!songInfo) return message.channel.send("No such song.");
      console.log("Playing =", songConstruct.playing);
      if (!songConstruct.playing) {
        try {
          // Tries to join a voice channel
          songConstruct.connection = await message.member.voice.channel.join();
          songConstruct.songs.push(songInfo);
          play( message, songConstruct);
        } catch (error) {
          console.log(error);
          return message.reply("Sorry, I am not able to join that voice channel. Contact your Server's Admin!");
        }
      } else {
        songConstruct.songs.push(songInfo);
        return message.reply(`Added song ${songInfo.title} to the playing queue!`);
      } 
      break;

    case "skip":
      skip(message, songConstruct);
      break;
    
    case "stop":
      stop(message, songConstruct);
      break;
    
    case "queue":
      if (songConstruct.songs.length === 0) return message.reply(`0 Songs in Queue`);
      message.channel.send(`
      __Song Queue__
        \`\`\`${songConstruct.songs.map((song, i) => `${i+1} ${song.title}`).join('\n')}\`\`\`
      `)
      break;
    
    case 'help':
      const embed = new Discord.MessageEmbed()
        .setTitle("Help for TheByteSlash Music BOT")
        .setColor(0x00ff00)
        .setDescription(`
          \`\`\`${prefix}play <song name> : Use this to play any song.\n${prefix}skip : Skips the currently playing song.\n${prefix}stop : Deletes the song queue and disconnects the bot.\n${prefix}queue : Displays the list of songs to be played.
          \`\`\`
        `)
      message.channel.send(embed);
      break;
  
    default:
      message.reply(`Use command \`${prefix}help\` for help on how to use the bot.`)
      break;
  }
});

client.once("disconnect", () => {
  return songConstruct.connection.disconnect;
})

async function play(message, songConstruct){
  const {songs} = songConstruct;

  message.channel.send(`Streaming Now! ${songs[0].title}`);
  songConstruct.connection.play(ytdl(songs[0].videoUrl),  { type: 'opus' })
    .on("finish", () => {
      songs.shift();
      console.log(songConstruct.songs);
      if (songs.length === 0) return stop(message, songConstruct);
      play(message, songConstruct);
    })
    .on("error", () => console.log(error));

  songConstruct.playing = true;
}

async function skip(message, songConstruct){
  const {songs} = songConstruct;
  if (!songs.length) return message.reply(`No songs currently in queue. Add some with \`${prefix}addsong song_name\``);
  if (songs.length === 1) {
    message.channel.send("No more songs in queue. Disconnecting bot audio.");
    return stop(message, songConstruct);
  } 

  songs.shift();
  message.channel.send("Skipped the currently playing song.");
  return play(message, songConstruct);
}

async function stop(message, songConstruct){
  songConstruct.songs = [];
  songConstruct.playing = false;
  await songConstruct.connection.disconnect();
  songConstruct.connection = null;
  return message.channel.send(`The bot has been disconnected from the voice channel. Use command \`${prefix}play\` to play again.`);
}

client.login(token);