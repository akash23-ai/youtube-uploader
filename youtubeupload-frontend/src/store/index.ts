import {create} from "zustand"


interface User {
    user : any,
    setUser : (by : any) => void
}



export const useStore = create<User>()((set) =>( {
    user : null,
    setUser : (by) => set(() => ({
        user : by
    }))  
}))