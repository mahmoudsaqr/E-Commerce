import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CATegory, USER } from "../../../API/API";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function UpdateCategory() {
//   const id = Number(window.location.pathname.split("/").slice(-1));
  const {id} = useParams();
//   const idx = useParams().id;
  console.log(id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [enable, setEnable] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    Axios.get(`${CATegory}/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setImage(res.data.image);
        setEnable(true);
        setLoading(false);
        console.log(res);
      })
      .catch(() => {
        navigator("/dashboard/users/page/404", { replace: true });
      });
  }, []);
  async function handelSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATegory}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {}
  }
  return (
    <>
      {loading && <Loading />}
      <div style={{ width: "100%" }}>
        <h1 style={{ padding: "30px", textAlign: "center" }}>
          Update Category Page
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={(e) => setImage(e.target.files.item(0))}
                type="file"
              />
            </Form.Group>
            <Button disabled={!enable} type="submit" variant="primary">
              Update Category
            </Button>{" "}
          </Form>
        </div>
      </div>
    </>
  );
}
