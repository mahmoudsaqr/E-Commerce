import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../API/API";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //Error
  const [err, setError] = useState("");
  const [flag, setFlag] = useState(true);
  //Loading
  const [loading, setLoading] = useState(false);
  // useRef focus
  const focusOnInput1 = useRef("");
  //handle focusOnInput1
  useEffect(() => {
    focusOnInput1.current.focus();
  }, []);
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
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      navigate("/dashboard/users");
      console.log("succes");
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        setError("The Email has already been taken");
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
          <form className="form" onSubmit={handleSubmit}>
            <h1>Register Now</h1>

            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Your Name.."
                onChange={handleFormChange}
                required
                ref={focusOnInput1}
              />
              <Form.Label>Name:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter Your email.."
                onChange={handleFormChange}
                required
              />
              <Form.Label>Email:</Form.Label>
            </Form.Group>

            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter Your Password.."
                onChange={handleFormChange}
                minLength={"6"}
                required
              />
              <Form.Label>Password:</Form.Label>
            </Form.Group>
            <button className="btn-login">Register</button>
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
                  <b>Register with Google</b>
                </p>
              </a>
            </div>
            {err !== "" && !flag && <span className="error">{err}</span>}
          </form>
        </div>
      </div>
    </>
  );
}
