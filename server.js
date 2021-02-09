const express = require ('express');
const cors = require('cors');
const app = express();

const VideoData = require('./VideoData'); 

app.use(cors());

//call search and upload function for first time immediately
//function to fetch and upload youtube video data with query="Hello"
VideoData.UploadVideoData();

//automatically search and upload data every 15 mins
setInterval(VideoData.UploadVideoData,900000);

// route to get video data from our database
app.get('/getVideoData',(req,res) => {VideoData.getVideoData(req,res)})


//run app on localhost:8000
app.listen(8000, () => {
	console.log(`Working on port 8000`);
})