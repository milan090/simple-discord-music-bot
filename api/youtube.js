const fetch = require('node-fetch');
const { YOUTUBE_API_KEY,  } = require('../config.json');
const knex = require('knex')({
  client: 'pg',
  version: '12',
  connection: {
    host : '127.0.0.1',
    user : process.env.DB_USER || 'postgres',
    password : process.env.DB_PASS || '',
    database : process.env.DB_NAME || 'ytmusic'
  }
});

const getYoutubeVideoInfo = async (query) => {
  let data = null;
  try {
    data = await knex('songdata').select('query','title','videourl').where('query', '=', query);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  if (data.length == 0) {    
    try {
      console.log("Using google API");
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`)
      const data = await response.json();
      console.log(data);
  
      if (!data.items) return null;
      const videoUrl = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
      const title = data.items[0].snippet.title;
      const songInfo = { title, videoUrl };
      await knex('songdata').insert({
        query: query,
        title: title,
        videourl: videoUrl
      })
      return songInfo;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Using database");
    const { title, videourl } = data[0];
    return {
      title,
      videoUrl: videourl
    }
  }
}


module.exports = {
  getYoutubeVideoInfo
}