const axios = require('axios');
const mysql = require('./mysql');
const config =  require('./config.json')

// we can use a maximum of 3 api keys
const ApiKeys = config.apiKeys
var apiIndex=0;


//function to fetch youtube video data with query="Hello"
fetchYoutubeApi = async (api_key) =>{
    const date = new Date();

    //video published in last 15 mins
    date.setMinutes( date.getMinutes() - 15 );

    //RFC 3339 format
    const formatted_date = date.toISOString();

    params = {
        part:"snippet",
        order:"date",
        q:"Hello",
        type:"video",
        publishedAfter:formatted_date,
        key:api_key
    }
    try{
       const resp =  await axios.get('https://youtube.googleapis.com/youtube/v3/search',{params});
       return resp;
    }catch(err){
        return err.response.data.error
    }
}

//function to fetch and upload video data to database
const UploadVideoData = async () =>{
    try{
        let resp = await fetchYoutubeApi(ApiKeys[apiIndex]);
        while(resp.errors){
            if(apiIndex>=ApiKeys.length)
                return;
            resp = await fetchYoutubeApi(ApiKeys[++apiIndex]);
        }

        const items = resp.data.items;
        
        await mysql.connect()
        for(var i=0;i<items.length;i++){
        let query = `INSERT INTO VideoData(Title,VideoDesc,ThumbnailURL,PublishTime) VALUES("${items[i].snippet.title}","${items[i].snippet.description}","${items[i].snippet.thumbnails.default.url}","${items[i].snippet.publishTime}")`
        let resp = await mysql.query(query);
        }
        mysql.end()
          
    }catch(err){
        console.log(err);
    }
}


//function to get videodata stored in database database
const getVideoData = async (req,res) =>{
    try{
        //default results per page is 10
        const {res_per_page=10 , page_no=1} = req.query;

        const offset = (page_no-1)*res_per_page;

        await mysql.connect()

        //select results for the required page number,if we got invalid page number or result per page it will set it to default
        let query = `SELECT Title,VideoDesc as Description,ThumbnailURL,PublishTime FROM VideoData ORDER BY PublishTime DESC LIMIT ${Math.max(10,res_per_page)} offset ${Math.max(0,offset)}`
        let resp = await mysql.query(query);
        mysql.end()

        res.json(resp);
          
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    UploadVideoData,
    getVideoData
}