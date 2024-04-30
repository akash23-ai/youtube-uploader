import fs from "fs"
import readline from "readline";
import assert from "assert"
import {google} from "googleapis"
import express from "express"
import path from "path"
const OAuth2 = google.auth.OAuth2;

// video category IDs for YouTube:
const categoryIds = {
  Entertainment: 24,
  Education: 27,
  ScienceTechnology: 28
}

// If modifying these scopes, delete your previously saved credentials in client_oauth_token.json
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_PATH = '../' + 'client_oauth_token.json';

const videoFilePath = path.resolve(__dirname, 'video.mp4') 
const thumbFilePath = path.resolve(__dirname, 'thumb.jpg')
const app = express();

console.log(__dirname)

console.log(videoFilePath)
console.log(thumbFilePath)


app.use(express.json());


function getNewToken(oauth2Client:any, callback:any) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
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



function storeToken(token:any) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log("Token Is Stored")
    console.log('Token stored to ' + TOKEN_PATH);
  });
};




app.get("/", (req, res) => {
    const uploadTheVideo = (title:any, description:any, tags:any) => {
      
        console.log(__dirname)
        // Load client secrets from a local file.
        fs.readFile(path.resolve(__dirname, '../secret/client_secret.json'), function processClientSecrets(err, content:any) {
          if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
          };

          console.log("I am In fs readfile")
          // Authorize a client with the loaded credentials, then call the YouTube API.
          authorize(JSON.parse(content), (auth:any) => uploadVideo(auth, title, description, tags));
        });
      }

      function uploadVideo(auth:any, title:any, description:any, tags:any) {
        const service = google.youtube('v3')
      
        //@ts-ignore
        const res = service.videos.insert({
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
          service.thumbnails.set({
            auth: auth,
            videoId: response.data.id,
            media: {
              body: fs.createReadStream(thumbFilePath)
            },
          }, function(err:any, response:any) {
            if (err) {
              console.log('The API returned an error: ' + err);
              return;
            }
            console.log(response.data)
          })
        });
      }

      function authorize(credentials:any, callback:any) {
        console.log(credentials)
        const clientSecret = credentials.web.client_secret;
        const clientId = credentials.web.client_id;
        const redirectUrl = credentials.web.redirect_uris[0];
        const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
      
        // Check if we have previously stored a token.
        console.log(TOKEN_PATH)
        fs.readFile(TOKEN_PATH, function(err, token:any) {
          if (err) {
            console.log("In fs ReadFile")
            getNewToken(oauth2Client, callback);
          } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
          }
        });
      }
      
     
      const value = uploadTheVideo("My First Video", "This is My First Video", "First Video");

      console.log(value);

      res.json({message : "Hi there"})
      
      
});


app.get("/google", (req, res) => {
    const body = req.headers
    console.log(body)

    const {code , scope} = req.query

    const {token} = req.query

    console.log(token)

    console.log(code, scope)

    res.json({code : code})
// //@ts-ignore
//     console.log(req)
})


app.listen(3000, () => {
    console.log("Server running on 3000")
})