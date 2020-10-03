const { prefix } = require("../../config.json");

async function remove(message, songConstruct, index) {
  if (!index) return message.channel.send("Please specify the index of the song to remove from queue");
  const songIndex = parseFloat(index) - 1;  // Makes the arg a number and then makes drops it by one (index start at 0)
  if (songIndex === 0) return message.channel.send(`Use ${prefix}skip to remove the current song!`);
  if (!songConstruct.songs[songIndex]) return message.channel.send("A song with that doesn't exist in this queue.");

  const songToRemove = songConstruct.songs.pop(songIndex);
  message.channel.send(`${songToRemove.title} has been removed from queue.`);
}

module.exports = {
  remove
};