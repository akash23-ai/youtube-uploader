import fs from "fs"
import path from "path"
import readline from "readline"
import {google} from "googleapis"
import { authorize } from "./youtube-auth"

const OAuth2 = google.auth.OAuth2;

// This file contain all the youtube functional code

// Video category IDs for YouTube:
const categoryIds = {
    Entertainment: 24,
    Education: 27,
    ScienceTechnology: 28
  }

 const SCOPES = ['https://www.googleapis.com/auth/youtube.upload']



 export const readAuthFile = (path:any) => {
  console.log(path)
    const data = fs.readFileSync(path, {
      encoding : "utf8"
    });
    // console.log("Data is ",data);

    const credentials = JSON.parse(data);
    return credentials;
 }

export const uploadTheVideo = async (title:string, description:string, tags:string[] | string, videoFilePath : string, thumbFilePath : string) => {
    console.log("Dir is ",__dirname);

    const credentials = readAuthFile(path.resolve(__dirname, '../../secret/client_secret.json'));

    const clientSecret = credentials.web.client_secret;
    const clientId = credentials.web.client_id;
    const redirectUrl = credentials.web.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
   try {
    const tokenData = fs.readFileSync(process.env.TOKEN_PATH || "", {
      encoding : "utf8"
    });

    const token = JSON.parse(tokenData);
    console.log("Token is ",token); 
     oauth2Client.credentials = token;
   } catch (error) {
      console.log("error here");
      const res = getNewToken(oauth2Client, (auth:any) => uploadVideo(auth, title, description, tags, videoFilePath, thumbFilePath));
      return res;
   }

  

    const response = uploadVideo(oauth2Client, title, description, tags, videoFilePath, thumbFilePath);
    return response;
    // authorize(oauth2Client, (auth:any) => uploadVideo(auth, title, description, tags, videoFilePath, thumbFilePath))

    

    // readAuthFile(path.resolve(__dirname, '../../secret/client_secret.json'), (data: any) => {
    //   authorize(data, (auth:any) => uploadVideo(auth, title, description, tags, videoFilePath, thumbFilePath))
    // })
    // Load client secrets from a local file.
    // fs.readFile(path.resolve(__dirname, '../../secret/client_secret.json'), function processClientSecrets(err, content:Buffer) {
    //   if (err) {
    //     console.log('Error loading client secret file: ' + err);
    //     return;
    //   };
    //   console.log("I am In fs readfile")
    //   // Authorize a client with the loaded credentials, then call the YouTube API
    //   authorize(JSON.parse(content.toString()), (auth:any) => uploadVideo(auth, title, description, tags, videoFilePath, thumbFilePath));
    // });
  }


  export function getNewToken(oauth2Client:any, callback:any) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl); 
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code : string) {
      rl.close();
      oauth2Client.getToken(code, function(err:any, token:any) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  export function clientToken(oauth2Client:any, callback : any, code : any){
    oauth2Client.getToken(code, (err:any, token:any) => {
      if(err) {
        console.error
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    })
  }
  
  
  
  export function storeToken(token:any) {
    fs.writeFile(process.env.TOKEN_PATH || "", JSON.stringify(token), (err) => {
      if (err) throw err;
      console.log("Token Is Stored")
      console.log('Token stored to ' + process.env.TOKEN_PATH || "");
    });
  };


  export function uploadVideo(auth:any, title:any, description:any, tags:any, videoFilePath: string, thumbFilePath : string) {

    console.log(auth)
    const youtube = google.youtube('v3')
    console.log("I am in upload video")
    //@ts-ignore
    const res = youtube.videos.insert({
      auth: auth,
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags,
          categoryId: categoryIds.ScienceTechnology,
          defaultLanguage: 'en',
          defaultAudioLanguage: 'en'
        },
        status: {
          privacyStatus: "private"
        },
      },
      media: {
        body: fs.createReadStream(videoFilePath),
      },
    }, function(err:any, response:any) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log(response.data)
  
      console.log('Video uploaded. Uploading the thumbnail now.')
      youtube.thumbnails.set({
        auth: auth,
        videoId: response.data.id,
        media: {
          body: fs.createReadStream(thumbFilePath)
        },
      }, function(err:any, response:any) {
        if (err) {
          console.log('The API returned an error: ' + err);
          return err;
        }
        console.log(response.data)
      })
    });

    return res;
  }