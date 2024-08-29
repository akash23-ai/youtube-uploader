import { GoogleLogin, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useStore } from "@/store/index";
import axios from "axios"

export function SignIn() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [credential, setCredential] = useState<
  Omit<TokenResponse, "error" | "error_description" | "error_uri">
>();

  console.log(credential);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setCredential(response);
    },
    onError: () => console.log(),
  });



  useEffect(() => {
    if(credential){
        axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credential.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${credential.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [credential])

  return (
   <button className="p-3 rounded-md" onClick={() => login()}>SignIn With Google</button>
  );
}
