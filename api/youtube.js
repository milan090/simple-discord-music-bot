const yts = require( 'yt-search' )

const getYoutubeVideoInfo = async (query) => {
  try {
    const res = await yts(query);
    const video = res.videos[0];
    return {
      videoUrl: video.url,
      title: video.title
    }
  } catch (error) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getYoutubeVideoInfo
}