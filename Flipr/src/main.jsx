import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FollowMouseCircle from "./FollowMouse.jsx";
import Loader from "./Loader.jsx";
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Loader/>
    <FollowMouseCircle/>
    <App />
  </React.StrictMode>,
)
