import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { USER } from "../../../API/API";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPass] = useState("");
  // useRef focus
  const focusOnInput1 = useRef("");
  //handle focusOnInput1
  useEffect(() => {
    focusOnInput1.current.focus();
  }, []);

  async function handelSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: username,
        email: email,
        role: role,
        password: password,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ padding: "30px", textAlign: "center" }}>Add User Page</h1>
      <div
        style={{
          flexDirection: "column",
          width: "90%",
          margin: "auto",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <Form style={{ width: "100%" }} onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              placeholder="Enter Username..."
              ref={focusOnInput1}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter Email..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              required
              placeholder="Enter Password..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option disabled value={""}>
                Select Role...
              </option>
              <option value={1995}>Admin</option>
              <option value={2001}>User</option>
              <option value={1996}>Writer</option>
              <option value={1999}>Product Manager</option>
            </Form.Select>
          </Form.Group>
          <Button
            disabled={
              username.length > 1 &&
              email.length > 1 &&
              password.length > 6 &&
              role !== ""
                ? false
                : true
            }
            type="submit"
            variant="primary"
          >
            Add User
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}
