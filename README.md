# YoutubeData_Api
a simple backend api and service to fetch and upload Youtube video data using youtube Api

## Tech Used
- NodeJS for backend service
- MySQL database to store the data
- AWS for deploying the API for demo

## How to run this project

1.Clone/Download the repo

2.Go To source root directory

3.Install dependencies using npm install

4.Run npm start after installation is complete and server will be running at localhost:8000 and will start uploading youtube data to database.

5.To Check the getVideoData APi call localhost:8000/getVideoData

# Prerequisite
You will need to create a a file named config.json in the source directory which should contain data like this:

![config](https://user-images.githubusercontent.com/61136667/107323635-9f18b000-6acc-11eb-85cc-ca46f5a6b174.PNG)


## demo of the api deployed in Aws APi gateway:

[Click here for getVideoData API](https://db9nor25a0.execute-api.ap-south-1.amazonaws.com/prod/getVideoData).

parameters for the api

1. res_per_page : Max number of results to be fetched from database (default value is 10)
2. page_no : page number (if using pagination technique) default value is 1

