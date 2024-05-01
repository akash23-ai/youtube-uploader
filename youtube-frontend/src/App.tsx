import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scene/Home";
import Upload from "./scene/Upload";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/upload" element={<Upload />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
