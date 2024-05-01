import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

function Upload() {
    const [video, setVideo] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState();

  return (
    <div className="w-full min-h-screen h-full bg-[#E0F8F2]">
      <div className="flex justify-center text-white font-bold text-4xl mb-8 mt-4">Upload The <span className="text-[#009387]">Video , Title and Description</span></div>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="videos" className="font-bold mb-4 text-white">
            Videos
          </Label>
          <Input id="videos" className="py-2 px-4 mb-4" type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)} />

          <Label htmlFor="title" className="font-bold mb-4 text-white">
            Title
          </Label>
          <Input id="title" value={title} className="py-2 px-4 mb-4" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />

          <Label htmlFor="description" className="font-bold mb-4 text-white">
            Desccription
          </Label>
          <Input id="description" value={description} className="py-2 px-4 mb-4" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />

          <div className="mt-6 w-full">
            <Button className="bg-transparent border border-white">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
