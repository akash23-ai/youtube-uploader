import express from "express"
import { google } from "googleapis"

import OAuthData from "../secret/crediential.json"

const title = "My Title"
const description = "This is my video"
const Tag = ["MyVideo"]


const CLIENT_ID = OAuthData.web.client_id
const CLIENT_SECRET = OAuthData.web.client_secret
const REDIRECT_URL = OAuthData.web.redirect_uris[0]

console.log(REDIRECT_URL)


const SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
)

const app = express();

let auth = false;

app.get("/", (req, res) => {
    if(!auth) {
        const url : string = oAuth2Client.generateAuthUrl(
           {
            access_type : "offline",
            scope : SCOPES
           }
        )

        res.json({url})
    }
})


app.get("/google/:code", (req, res) => {
    const {code} = req.params;

    if(code){
        oAuth2Client.generateAuthUrl();
    }
})
// need to add the code to get the token from the code

app.listen(3000, () => {
    console.log(`Listening at Port : 3000`)
})





