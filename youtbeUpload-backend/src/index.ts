import express from "express"
import dotenv from "dotenv"
import { uploadInput } from "./zod";
import { uploadTheVideo } from "./controller/youtube-controller";
import { videoFilePath, thumbFilePath } from "./store";
import cors from "cors"
import { upload } from "./middleware/upload";


const app = express();


console.log(videoFilePath)
console.log(thumbFilePath)


app.use(express.json());
dotenv.config()
app.use(cors({
  origin: "*"
}))

//@ts-ignore
app.post("/", upload.fields([
  {
    name: "video",
    maxCount : 1
  },
  {
    name : "thumbnail",
    maxCount : 1
  }
]),  (req, res) => {
    const body = req.body;
    console.log(body)
    //@ts-ignore
    const videoFilePath = req.files?.video[0].path;
    //@ts-ignore
    const thumbFilePath = req.files?.thumbnail[0].path;
    console.log(videoFilePath, thumbFilePath)
    const success = uploadInput.safeParse(body);

    console.log(success.success)

    // if(!success.success){
    //   return res.status(401).json({message : "Inputs are Invalid"})
    // }
    try {
      const value = uploadTheVideo(body.title, body.description, "First Video", videoFilePath, thumbFilePath);
      console.log(value);
    res.status(200).json({value, message : "Upload SucessFull"})   
    } catch (error) {
      console.log(error);
      //@ts-ignore
      res.status(501).json({message : error.message})
    }

});


app.get("/google", (req, res) => {
    const {code , scope} = req.query
    console.log(code, scope)
    res.status(200).json({code : code})
})


app.listen(3000, () => {
    console.log("Server running on 3000")
})