const yts = require("yt-search");
const { validURL } = require('../helpers/urlChecker');
const { getYoutubeId } = require('../helpers/getYoutubeId');

const getYoutubeVideoInfo = async (songName) => {
  try {

    if (validURL(songName)){
      songName = getYoutubeId(songName);
    }else{
      songName = songName.toLowerCase();
    }

    const res = await yts(songName);
    const video = res.videos[0];
    return {
      videoUrl: video.url,
      title: video.title
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getYoutubeVideoInfo
};