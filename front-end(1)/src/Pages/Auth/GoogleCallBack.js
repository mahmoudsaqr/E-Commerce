import axios from "axios";
import { useEffect } from "react";
import { baseURL, GOOGLE_CALL_BACK } from "../../API/API";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
export default function GoogleCallBack() {
  const location = useLocation();
  //Cookie
  const cookie = Cookie();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
        );
        console.log(res);
        cookie.set("e-commerce",res.data.access_token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
  return (
    <div className="App">
      <h1>GoogleCallBack Page</h1>
    </div>
  );
}
