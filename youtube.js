const fetch = require('node-fetch');
const { YOUTUBE_API_KEY } = require('./config.json');

const getYoutubeVideoInfo = async (query) => {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`)
    const data = await response.json();

    if (!data.items) return null;
    const videoUrl = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
    const title = data.items[0].snippet.title;
    const songInfo = { title, videoUrl };
    return songInfo;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getYoutubeVideoInfo
}