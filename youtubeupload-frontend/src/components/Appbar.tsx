import { useStore } from "@/store"
import { useNavigate } from "react-router-dom"


export function Appbar(){
        const navigate = useNavigate()
        const user = useStore(state => state.user)

    return (
        <nav className="w-full p-4 flex justify-between bg-[#E0F8F2] border-b border-gray-600">
            <div className="flex justify-center">
                <h1 className="text-lg font-bold text-red-600">
                    Youtube Uploader
                </h1>
            </div>

            <div className="flex justify-center items-center">
                { user ? (
                    <div>
                        {JSON.stringify(user)}
                    </div>
                ): (
                    <button className="flex justify-center items-center rounded-md p-3 bg-green-600 hover:bg-green-400" onClick={() => navigate("/signin")}>    
                            SignIn
                    </button>
                ) }
            </div>
        </nav>
    )
}