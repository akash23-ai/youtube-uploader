import express from "express"
import dotenv from "dotenv"
import { uploadInput } from "./zod";
import { uploadTheVideo } from "./controller/youtube-controller";
import { videoFilePath, thumbFilePath } from "./store";


const app = express();


console.log(videoFilePath)
console.log(thumbFilePath)


app.use(express.json());
dotenv.config()


app.post("/", (req, res) => {
    const body = req.body;
    console.log(body)
    const success = uploadInput.safeParse(body);

    if(!success.success){
      return res.status(401).json({message : "Inputs are Invalid"})
    }
    try {
      const value = uploadTheVideo("My First Video", "This is My First Video", "First Video");
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