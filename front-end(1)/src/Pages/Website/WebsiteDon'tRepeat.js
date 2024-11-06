import React from "react";
import { Container} from "react-bootstrap";
import { Outlet } from "react-router-dom";

import "./HomePage.css";
import TopBarHome from "./Components/TopBarHome";


export default function WebsiteDontRepeat() {
  return (
    <>

      <TopBarHome />

      <div style={{marginTop:"90px"}}>
        <Outlet />
      </div>
    </>
  );
}
