import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import { USER } from "../../../API/API";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../API/axios";
import Error403 from "./../Error/403";
export default function RequireAuth({ allowedRole }) {
  //Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  //navigate
  const navigate = useNavigate();
  //state
  const [user, setUser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
