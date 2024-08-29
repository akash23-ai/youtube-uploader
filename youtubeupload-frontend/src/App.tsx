import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scene/Home";
import Upload from "./scene/Upload";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SignIn } from "./components/auth/SignIn";
import { Appbar } from "./components/Appbar";
import { Auth } from "./components/Auth";


function App() {
  return (
   <GoogleOAuthProvider clientId={"1047471835312-8gvsmvq4h04l2hfss8f1ldg5gkude9k2.apps.googleusercontent.com"}>
     <BrowserRouter>
     <Appbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/upload" element={<Upload/>}/>
    </Routes>
    </BrowserRouter>
   </GoogleOAuthProvider>
  );
}

export default App;
