import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const root = () => {
  return (
    <div id="root"></div>
  )
}


ReactDOM.render(
 
    <App />
  ,
  document.getElementById("root")
);
