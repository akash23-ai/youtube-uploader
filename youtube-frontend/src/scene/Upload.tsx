import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import axios from "axios"

function Upload() {
    const [video, setVideo] = useState<File>();
    const [thumbnail, setThumbnail] = useState<File>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>();

    const handleClick = async() => {
        const formData = new FormData();
        setTags(["my first Video"]);
        //@ts-ignore
        formData.set("video", video);
        formData.set("title", title);
        formData.set("description", description)
        //@ts-ignore
        formData.set("tags", tags)
        //@ts-ignore
        formData.set("thumbnail", thumbnail)

        console.log(video, "Thumbnail ", thumbnail)
        

        try {
            const response = await axios.post("http://localhost:3000/", formData)

             console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="w-full min-h-screen h-full bg-[#E0F8F2]">
      <div className="flex justify-center text-[#2E2F35] font-bold text-4xl mb-8 pt-16">Upload The  <span className="text-[#009387]"> Video, Thumbnail, Title and Description</span></div>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="videos" className="font-bold mb-2 text-[#58595D]">
            Videos
          </Label>
          <Input id="videos" className="py-2 px-4 mb-4" type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
            //@ts-ignore
            setVideo(e.target?.files[0])} />
{/* 
          <input type="file" className="file:border-2 file:py-2 file:px-4 file:rounded-md file:bg-[#009387] file:font-semibold file:text-white file:transition mb-4" id="videos" onChange={(e:React.ChangeEvent<HTMLInputElement>) => console.log(e.target?.files[0] || "")} /> */}
          <Label htmlFor="thumbnail" className="font-bold mb-2 text-[#58595D]">
            Thumbnail
          </Label>
          <Input id="thumbnail" className="py-2 px-4 mb-4" type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
            //@ts-ignore
            setThumbnail(e.target?.files[0])} />


          <Label htmlFor="title" className="font-bold mb-4 text-[#58595D]">
            Title
          </Label>
          <Input id="title" value={title} className="py-2 px-4 mb-4" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />

          <Label htmlFor="description" className="font-bold mb-4 text-[#58595D]">
            Description
          </Label>
          <Input id="description" value={description} className="py-2 px-4 mb-4" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />

          <div className="mt-6 w-full">
            <Button className="bg-[#FF6D2C] drop-shadow-4xl shadow-md shadow-black" onClick={handleClick}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
