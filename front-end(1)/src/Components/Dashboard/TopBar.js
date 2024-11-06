import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Axios } from "../../API/axios";
import { LOGOUT, USER } from "../../API/API";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { getRoles } from "@testing-library/react";

export default function TopBar() {
  const [name, setName] = useState([]);
  const [role, setRole] = useState([]);
  const MyMenu = useContext(Menu);
  const Open_Menu = MyMenu.setIsOpen;
  const navigator = useNavigate();
  const cookie = Cookie();
  useEffect(() => {
    try {
      Axios.get(`/${USER}`).then((res) => {
        setName(res.data.name);
        setRole(res.data.role);
      });
    } catch (err) {}
  }, []);
  async function handleLogOut() {
    const res = await Axios.get(`/${LOGOUT}`);
    navigator("/login");
    cookie.remove("e-commerce");
    console.log(res);
  }
  return (
    <div className="top-bars d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <h1>E-Commerce</h1>
        <FontAwesomeIcon
          onClick={() => Open_Menu((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
      </div>
      <div>
        <DropdownButton
          variant="light"
          id="dropdown-basic-button"
          title={name}
          style={{ backgroundColor: "white", color: "black" }}
          menuVariant="dark"
        >
          <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
        </DropdownButton>
        <div style={{  color: "#6c757d", fontSize: "0.9em" ,textAlign:"center"}}>
          {role === "1995" ? (
            "Adminstrator"
          ) : role === "2001" ? (
            "User"
          ) : role === "1996" ? (
            "Writer"
          ) : role === "1999" ? (
            "Product Manager"): ("") }
        </div>
      </div>
    </div>
  );
}
