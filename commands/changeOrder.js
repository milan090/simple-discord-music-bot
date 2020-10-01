const ytdl = require("discord-ytdl-core");

indexIsValid = (index, songsLength) => {
  return index > 1 && index <= songsLength;
};

async function changeOrder(message, songConstruct, songIndex, newIndex) {
  const { songs } = songConstruct;
  if (!songs.length)
    return message.channel.send("There aren't any song on you queue!");

  if (!songIndex || !newIndex)
    return message.channel.send(
      "Please specify the index of the song to have the order changed and the new index"
    );

  if (
    !indexIsValid(songIndex, songs.length) ||
    !indexIsValid(newIndex, songs.length)
  )
    return message.channel.send(
      `Please specify valid indexes!\n the indexes must be between 2 and ${songs.length}`
    );

  const index1 = parseFloat(songIndex) - 1;
  const index2 = parseFloat(newIndex) - 1;
  const songToBeChanged = songs[index1];

  const newSongs = [
    ...songs.filter(({ videoUrl }) => videoUrl !== songToBeChanged.videoUrl),
  ];

  newSongs.splice(index2, 0, songToBeChanged);
  return newSongs;
}

module.exports = { changeOrder };
