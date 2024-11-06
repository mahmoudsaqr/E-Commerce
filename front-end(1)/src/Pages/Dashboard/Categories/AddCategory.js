import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CAT, CATegory, USER } from "../../../API/API";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  // useRef focus
  const focusOnInput1 = useRef("");
  //handle focusOnInput1
  useEffect(() => {
    focusOnInput1.current.focus();
  }, []);
  async function handelSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATegory}/add`, form);
      window.location.pathname = "/dashboard/categories";
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
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              ref={focusOnInput1}
              placeholder="Enter Title..."
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              onChange={(e) => setImage(e.target.files.item(0))}
              type="file"
            />
          </Form.Group>
          <Button
            disabled={title.length > 1 ? false : true}
            type="submit"
            variant="primary"
          >
            Add Category
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}
