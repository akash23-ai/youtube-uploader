import { createOAuthClient } from "@/lib/auth";




export function Auth(){

    const authUrl = createOAuthClient()

    return (
        <>
        {JSON.stringify(authUrl)}
        </>
    )

}