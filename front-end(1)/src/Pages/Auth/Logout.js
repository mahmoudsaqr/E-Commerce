import axios from "axios";
import { LOGOUT } from "../../API/API";
import { Axios } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function Logout() {
  const navigator = useNavigate();
  const cookie = Cookie();
  async function handleLogout() {
    const res = await Axios.get(`/${LOGOUT}`);
    navigator("/login");
    cookie.remove("e-commerce");
    console.log(res);
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
