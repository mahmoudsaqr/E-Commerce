import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { USER } from "../../../API/API";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function UpdateUser() {
  // const id = Number(window.location.pathname.split("/").slice(-1));
    const { id } = useParams();
    //   const idx = useParams().id;
    console.log(id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [enable, setEnable] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    Axios.get(`${USER}/${id}`)
      .then((res) => {
        setUsername(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
        setEnable(true);
        setLoading(false);
      })
      .catch(() => {
        navigator("/dashboard/users/page/404", { replace: true });
      });
  }, []);
  async function handelSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: username,
        email: email,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {}
  }
  return (
    <>
      {loading && <Loading />}
      <div style={{ width: "100%" }}>
        <h1 style={{ padding: "30px", textAlign: "center" }}>
          Update User Page
        </h1>
        <div
          style={{
            flexDirection: "column",
            width: "90%",
            margin: "auto",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <Form style={{ width: "100%" }} onSubmit={handelSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled value={""}>
                  Select Role
                </option>
                <option value={1995}>Admin</option>
                <option value={2001}>User</option>
                <option value={1996}>Writer</option>
              </Form.Select>
            </Form.Group>
            <Button disabled={!enable} type="submit" variant="primary">
              Update User
            </Button>{" "}
          </Form>
        </div>
      </div>
    </>
  );
}
