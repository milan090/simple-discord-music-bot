async function queue(message, songConstruct) {
  if (songConstruct.songs.length === 0)
    return message.reply("0 Songs in Queue");
  message.channel.send(`
  __Song Queue__
    \`\`\`${songConstruct.songs
    .map((song, i) => `${i + 1} ${song.title}`)
    .join("\n")}\`\`\`
  `);
}

module.exports = {
  queue,
};
