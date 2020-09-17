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

knex.connection = false;
// Checking Connection with DB
// knex doesn't have any other way to do that :(
knex('songdata').select("*").limit(1).then(data => {
  knex.connection = true;
  console.log(knex.connection ? "DB Connected!" : "DB NOT Connected");
});


const getYoutubeVideoInfo = async (query) => {
  let data = null;
  if (knex.connection) {
    try {
      data = await knex('songdata').select('title','videourl').where('query', '=', query);
    } catch (error) {
      console.error(error);
    }
  }
  if (data === null || !data.length) {    
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`);
      const data = await response.json();
  
      if (!data.items) return null;
      const videoUrl = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
      const title = data.items[0].snippet.title;
      const songInfo = { title, videoUrl };
      if (knex.connection) {
        try {
          await knex('songdata').insert({
            query: query,
            title: title,
            videourl: videoUrl
          })
        } catch (error) {
          console.log(error);
        }
      }
      return songInfo;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
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