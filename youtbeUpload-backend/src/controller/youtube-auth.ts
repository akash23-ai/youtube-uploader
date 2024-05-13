// This file will have all the authorization part
import {google} from "googleapis"
import fs from "fs"
const OAuth2 = google.auth.OAuth2;
import { getNewToken } from "./youtube-controller";

export function authorize(oauth2Client:any, callback:any) {
    // console.log(credentials)
    // console.log(credentials.web)
    // const clientSecret = credentials.web.client_secret;
    // const clientId = credentials.web.client_id;
    // const redirectUrl = credentials.web.redirect_uris[0];
    // const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  
    // Check if we have previously stored a token.
    console.log(process.env.TOKEN_PATH)
    fs.readFile(process.env.TOKEN_PATH || "", function(err, token:any) {
      if (err) {
        console.log("In fs ReadFile")
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }
  