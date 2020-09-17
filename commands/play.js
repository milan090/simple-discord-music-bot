const playSongs = require('./playSongs');

async function play(message, songConstruct) {
  const songInfo = songConstruct.songs[0];
  if (!songConstruct.playing) {
    try {
      // Tries to join a voice channel
      songConstruct.connection = await message.member.voice.channel.join();
      playSongs(message, songConstruct);
    } catch (error) {
      songConstruct.songs = [];
      console.log(error);
      return message.reply("Sorry, I am not able to join that voice channel. Contact your Server's Admin!");
    }
  } else {
    return message.channel.send(`Added song ${songInfo.title} to the playing queue!`);
  } 
}

module.exports = {
  play
}