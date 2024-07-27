// This file will have all the authorization part

import fs from "fs"

import { getNewToken } from "./youtube-controller";

export function authorize(oauth2Client:any, callback:any) {
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
  

  