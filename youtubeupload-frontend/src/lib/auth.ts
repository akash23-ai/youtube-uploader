import {google} from "googleapis"
import fs from "fs"
import path from "path"


const OAuth2 = google.auth.OAuth2;

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


export function createOAuthClient(){
    console.log(__dirname)
    
    const credentials = readAuthFile(path.resolve(__dirname, '../../secret/client_secret.json'));

    const clientSecret = credentials.web.client_secret;
    const clientId = credentials.web.client_id;
    const redirectUrl = credentials.web.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    try {
        const tokenData = fs.readFileSync(process.env.TOKEN_PATH || "", {
          encoding : "utf8"
        });
    
        const token = JSON.parse(tokenData);
        console.log("Token is ",token); 
         oauth2Client.credentials = token;
       } catch (error) {
          console.log("error here");
          const authUrl = getNewToken(oauth2Client);
          return authUrl;
       }




}

export function getNewToken(oauth2Client:any) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl); 
        return authUrl
   
  }

  export function storeToken(token:any) {
    fs.writeFile(process.env.TOKEN_PATH || "", JSON.stringify(token), (err) => {
      if (err) throw err;
      console.log("Token Is Stored")
      console.log('Token stored to ' + process.env.TOKEN_PATH || "");
    });
  };


  export function setAuth(oauth2Client : any , callback : any, token : any){
    oauth2Client.credentials = token;
    storeToken(token);
    callback(oauth2Client);
  
;
  }
