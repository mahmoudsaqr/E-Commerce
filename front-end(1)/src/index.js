import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/components/Loading.css";
import "./Css/components/google.css";
import "./Css/components/alerts.css";
import "./Pages/Auth/Auth.css";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import CArtChangerContext from "./Context/CartChangerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WindowContext>
    <MenuContext>
      <CArtChangerContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CArtChangerContext>
    </MenuContext>
  </WindowContext>
);
