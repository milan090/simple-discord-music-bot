const ytdl = require('discord-ytdl-core');
const { stop } = require('./stop');

async function playSongs(message, songConstruct){
  const {songs} = songConstruct;
  const song = songs[0];
  const videoUrl = song.videoUrl;

  if (!song.seek) message.channel.send(`Streaming Now! ${songs[0].title}`); // If seeking we don't want to send this msg
  
  const stream = ytdl(videoUrl, {
        filter: "audioonly",
        opusEncoded: true,
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
        seek: song.seek ? song.seek : 0
    });
  songConstruct.connection.play(stream, { type: 'opus' })
    .on("finish", () => {
      // Removes finished song (first on list)
      songs.shift();
      const userCount = songConstruct.connection.channel.members.array().length;
      if (songs.length === 0 || userCount < 2) return stop(message, songConstruct);
      // playSongs() recursively till songs queue is empty
      playSongs(message, songConstruct);
    })
    .on("error", () => console.log(error));

  songConstruct.playing = true;
}

module.exports = playSongs