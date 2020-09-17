const playSongs = require('./playSongs');

async function seek(message, songConstruct, time) {
  const [minutes, seconds] = time.split(':').map(parseFloat);
  const totalSeconds = (minutes*60) + seconds;
  songConstruct.songs[0].seek = totalSeconds;
  message.channel.send(`Skipping Song to ${time}`);
  await playSongs(message, songConstruct);
}

module.exports = {
  seek: seek
}