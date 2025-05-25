import React from "react";
import {Routes, Route} from "react-router-dom";
import MainPage from "./LayoutComponents/MainPage";
import CallbackPage from "./LayoutComponents/CallbackPage";
import './index.css'
function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth/callback" element={<CallbackPage />}/>
    </Routes>
  )
}

export default App
