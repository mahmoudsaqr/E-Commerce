import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CAT, PROduct } from "../../../API/API";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const { id } = useParams();
  console.log(id);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagesServer, setImagesServer] = useState([]);
  console.log(imagesServer);
  const [save, setSave] = useState(false);
  const [my_id, setID] = useState("");
  const [photo_id, setPhotoID] = useState([]);
  console.log(photo_id);
  console.log(categories);
  console.log(my_id);
  const nav = useNavigate();
  // useRef
  const focusOnInput1 = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  const j = useRef(-1);

  //handle focusOnInput1
  useEffect(() => {
    focusOnInput1.current.focus();
  }, []);
  //handle openImage
  function handleOpenImage() {
    openImage.current.click();
  }

  //edit Submit
  async function editSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`${PROduct}/edit/${id}`, form);
      if (photo_id) {
        for (let i = 0; i < photo_id.length; i++) {
          await Axios.delete(`product-img/${photo_id[i]}`);
        }
      }
      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
    }
  }
  //Handle submit Dummy Data
  //   async function handleSubmitDummyData() {
  //     try {
  //       await Axios.post(`${PROduct}/add`, dummyForm).then((res) => {
  //         console.log(res);
  //         setID(res.data.id);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //Handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //Handle Image Change
  async function handleImageChange(e) {
    //Add images only and when you add again it will delete the past images
    // setImages([...e.target.files]);
    //To Add an image after you add images
    setImages((prev) => [...prev, ...e.target.files]);
    //we save the images in a var as the setImages work after the function is finished after rerendering
    const imageAfterRendering = e.target.files;
    const dataImages = new FormData();
    for (let i = 0; i < imageAfterRendering.length; i++) {
      j.current++;
      dataImages.append("image", imageAfterRendering[i]);
      dataImages.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/add`, dataImages, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            progress.current[j.current].style.width = `${percent}%`;
            progress.current[j.current].setAttribute("percent", `${percent}%`);
          },
        });
        console.log(res);

        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  //Handle Delete Btn
  async function handleDeleteBtn(id, image) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      console.log(ids);
      setImages((prev) => prev.filter((img) => img !== image));
      ids.current = ids.current.filter((ids) => ids !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDeleteBtnInImageServer(id, image) {
    try {
      setImagesServer((prev) => prev.filter((img) => img !== image));
      setPhotoID((prevPhotoID) => [...prevPhotoID, id]);
    } catch (err) {
      console.log(err);
    }
  }
  //Get All Data
  useEffect(() => {
    try {
      Axios.get(`/product/${id}`).then((res) => {
        console.log(res);
        // setForm({
        //   category: `${res.data[0].category}`,
        //   title: `${res.data[0].title}`,
        //   description: `${res.data[0].description}`,
        //   price: `${res.data[0].price}`,
        //   discount: `${res.data[0].discount}`,
        //   About: `${res.data[0].About}`,
        // });
        setForm(res.data[0]);
        setImagesServer(res.data[0].images);
      });
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  }, []);
  //Get ALl Categories
  useEffect(() => {
    try {
      Axios.get(`/${CAT}`).then((res) => {
        console.log(res);
        setCategories(res.data);
      });
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  }, []);
  //Maping

  //map Categories to add in category Selector
  const categoryShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((image, key) => (
    <div className=" border w-100 mb-4">
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center justify-content-start gap-2 p-2">
          <img
            src={URL.createObjectURL(image)}
            style={{ width: "80px" }}
            alt="Upload Images"
          ></img>
          <div>
            <p>{image.name}</p>
            <p>
              {image.size / 1024 < 1000
                ? (image.size / 1024).toFixed(2) + " KB"
                : (image.size / (1024 * 1024)).toFixed(2) + " MB"}
            </p>
          </div>
        </div>
        <Button
          onClick={() => handleDeleteBtn(key, image)}
          className="m-2"
          variant="danger"
        >
          Delete
        </Button>
      </div>
      <div className="custom-progress">
        <span
          className="inner-progress"
          ref={(e) => (progress.current[key] = e)}
          percent="0%"
          //   percent={`${upload}%`}
          //   style={{ width: `${upload}%` }}
        ></span>
      </div>
    </div>
  ));
  const imagesServerShow = imagesServer.map((img, key) => (
    <div className="d-flex align-items-center justify-content-between border w-20 m-4 position-relative">
      <div className="d-flex align-items-center justify-content-between gap-2 ">
        <div className="d-flex align-items-center justify-content-start gap-2 p-2">
          <img
            src={`${img.image}`}
            style={{ width: "150px" }}
            alt="Upload Images"
          ></img>
        </div>
        <Button
          onClick={() => handleDeleteBtnInImageServer(img.id, img)}
          className="m-2 position-absolute top-0 end-0"
          variant="danger"
        >
          X
        </Button>
      </div>
    </div>
  ));
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ padding: "30px", textAlign: "center" }}>
        Update Product Page
      </h1>
      <div
        style={{
          flexDirection: "column",
          width: "90%",
          margin: "auto",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <Form style={{ width: "100%" }} onSubmit={editSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={form.category}
              onChange={handleFormChange}
              name="category"
              ref={focusOnInput1}
              placeholder="Enter Title..."
            >
              <option disabled>Select Category</option>
              {categoryShow}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={form.title}
              name="title"
              onChange={handleFormChange}
              type="text"
              required
              placeholder="Enter Title..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={form.description}
              onChange={handleFormChange}
              type="text"
              name="description"
              required
              placeholder="Enter Description..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={form.price}
              onChange={handleFormChange}
              type="text"
              name="price"
              required
              placeholder="Enter Price..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              value={form.discount}
              onChange={handleFormChange}
              type="text"
              name="discount"
              required
              placeholder="Enter Discount..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>About</Form.Label>
            <Form.Control
              value={form.About}
              onChange={handleFormChange}
              type="text"
              name="About"
              required
              placeholder="Enter About..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              value={form.stock}
              onChange={handleFormChange}
              type="number"
              name="stock"
              required
              placeholder="Enter Stock..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Images</Form.Label>
            <Form.Control
              onChange={handleImageChange}
              ref={openImage}
              multiple
              hidden
              type="file"
            />
          </Form.Group>
          <div
            onClick={handleOpenImage}
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
            style={{
              border: "2px dashed #0086fe",
              cursor: "pointer",
            }}
          >
            <img
              src={require("../../../images/png-transparent-cloud-upload-store-thumbnail.png")}
              alt="Upload Here"
              width="100px"
            />
            <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
              Upload Images
            </p>
          </div>
          <div className="d-flex flex-wrap">{imagesServerShow}</div>
          <div>{imagesShow}</div>
          <Button
            disabled={form.title.length > 1 ? false : true}
            type="submit"
            name="description"
            variant="primary"
          >
            Add Product
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}