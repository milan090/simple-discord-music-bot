const rndSong = require("rnd-song");
const {api_key} = require("../../config.json");

const options = {
  api_key: api_key,
  genre: 14,
  snippet: false,
  language: "en"
};

const phrases = [
  " would be perfect!",
  ", I love this one.",
  " will set the mood!",
  " is my suggestion.",
  " gives great vibes!",
  ", aha this one is great!"
];

async function suggest(message) {

  var phrase = phrases[Math.floor(Math.random () * phrases.length)];

  rndSong(options, function (err, res) {
    if(!err) {
      return message.channel.send(`🎵 ${res.track.track_name} by ${res.track.artist_name}${phrase}`);
    } else {
      return message.channel.send("Music Raze is angry!");
    }
  });
}

module.exports = {
  suggest
};