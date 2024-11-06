import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../API/API";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  //Error
  const [err, setError] = useState("");
  const [flag, setFlag] = useState(true);
  // useRef focus
  const focusOnInput1 = useRef("");
  //handle focusOnInput1
  useEffect(() => {
    focusOnInput1.current.focus();
  }, []);

  //Loading
  const [loading, setLoading] = useState(false);
  //Cookie
  const cookie = Cookie();
  //Navigate
  const navigate = useNavigate();
  //Handle on Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setFlag(true);
    try {
      let res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      cookie.set("e-commerce", token);
      const go = role === "1995" ? "users" : "writer";
      window.location.pathname = `/dashboard/${go}`;
      console.log(res);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setError("Invalid Email or Password");
      } else {
        setError("Invalid Server Error");
      }
      setLoading(false);
      setFlag(false);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <h1>Login</h1>

            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter Your email.."
                onChange={handleFormChange}
                required
                ref={focusOnInput1}
              />
              <Form.Label>Email:</Form.Label>
            </Form.Group>

            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter Your Password.."
                value={form.password}
                onChange={handleFormChange}
                minLength={"6"}
                required
              />
              <Form.Label>Password:</Form.Label>
            </Form.Group>
            <button className="btn-login">Login</button>
            <div className="google-btn">
              <a href={"http://127.0.0.1:8000/login-google"}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png"
                    alt="sign in with google"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with Google</b>
                </p>
              </a>
            </div>
            {err !== "" && !flag && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
