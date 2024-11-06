import { faPen, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink, useNavigate } from "react-router-dom";
import "./Bars.css";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowWidth } from "../../Context/WindowContext";
import { Axios } from "../../API/axios";
import { USER } from "../../API/API";
import { links } from "./NavLink";

export default function SideBar() {
  const MyMenu = useContext(Menu);
  const Open_Menu = MyMenu.isOpen;
  const windowWidth = useContext(WindowWidth);

  //navigate
  const navigate = useNavigate();
  //state
  const [user, setUser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.2)",
          top: "70px",
          left: "0",
          width: "100%",
          minHeight: "100vh",
          transition: "0.2s",
          display:
            windowWidth.width > "768" ? "none" : Open_Menu ? "block" : "none",
        }}
      ></div>
      <div
        className={`side-bar pt-3 ${Open_Menu ? `open` : ``}`}
        style={{
          left: windowWidth.width < "768" ? (Open_Menu ? 0 : "-100%") : "0px",
          width: Open_Menu ? "240px" : "69px",
          position: windowWidth.width < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (links, key) =>
            links.role.includes(user.role) && (
              <NavLink
                key={key}
                to={links.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "d-flex align-items-center gap-2 side-bar-link active"
                    : "d-flex align-items-center gap-2 side-bar-link"
                }
              >
                <FontAwesomeIcon icon={links.icon} />
                <p
                  className="m-0"
                  style={{ display: Open_Menu ? "block" : "none" }}
                >
                  {links.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
