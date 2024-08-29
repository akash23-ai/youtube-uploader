import { Button } from "@/components/ui/button"
import { useStore } from "@/store"
import {useNavigate} from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    const user = useStore((state) => state.user)
  return (
    <div className="w-full min-h-screen h-full bg-[#E0F8F2]">
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="flex flex-col justify-center items-center text-5xl font-bold pl-8 drop-shadow-md">
        <div className="text-[#2E2F35]">
        Welcome to the <span className="text-[#009387]">Youtube Uploader</span>
        </div>
        <div className="text-sm mt-6 w-full text-[#58595D] font-inter">
          Through This you can Directly upload your videos to Youtube with less work !
        </div>

        <div className="w-full">
          <Button className="bg-[#FF6D2C] stroke-[#2E2F35] drop-shadow-4xl shadow-md shadow-black text-sm" onClick={() => {
            if(user) {
              navigate("/upload")
            } else {
              navigate("/signin")
            }
          }}>Get Started</Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home