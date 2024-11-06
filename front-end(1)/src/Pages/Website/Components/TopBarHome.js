import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Button, Form, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaAngleDown, FaTimes, FaShoppingCart } from "react-icons/fa"; // إضافة FaShoppingCart للزر
import logo from "./../images/Orange and Gray Tag Cart Virtual Shop Logo (1)2.jpg";
import "./../HomePage.css";
import { Axios } from "../../../API/axios";
import { CAT } from "../../../API/API";
import StringSlice from "../../../Helpers/StringSlice";
import SkeletonPage from "../../../Components/Skeleton/SkeletonPage";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "./Btns/PlusMinusBtn";

export default function TopBarHome() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const LastFiveCategories = categories.slice(-8);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(5);
  const { isChange } = useContext(Cart);
  console.log(isChange);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    try {
      Axios.get(`/${CAT}`)
        .then((res) => {
          setCategories(res.data);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  }, []);
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  const toggleCategories = () => setIsOpen(!isOpen);
  const toggleAccountMenu = () => setIsAccountOpen(!isAccountOpen);
  const HandleDeleteItemCart = (id) => {
    const filterProducts = products.filter((item) => item.id !== id);
    setProducts(filterProducts);
    localStorage.setItem("product", JSON.stringify(filterProducts));
  };
  const categoriesShow = LastFiveCategories.map((category) => (
    <Link
      to={`/categories/${category.id}`}
      className="text-center m-0 links-categories"
      style={{ width: "9%", lineHeight: "60px" }}
      key={category.id}
    >
      {StringSlice(category.title, 15)}
    </Link>
  ));
  const cartShowProducts = products?.map((item) => (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          top: "30px",
          right: "0px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          width: "30px",
          height: "30px",
          textAlign: "center",
          borderRadius: "1000px",
          cursor: "pointer",
          backgroundColor: "red",
        }}
        onClick={() => HandleDeleteItemCart(item.id)} // يمكنك تخصيص وظيفة الحذف هنا
      >
        &times;
      </span>
      <div className="d-flex align-items-center justify-content-between gap-3">
        <img
          style={{ width: "150px", height: "100%" }}
          src={`${item.images[0].image}`}
          alt=""
        ></img>
        <div>
          <p>{item.title}</p>
          <p style={{ color: "gray" }}>{item.description}</p>
          <p style={{ color: "gray", textDecoration: "line-through" }}>
            {item.price}$
          </p>
          <p style={{ color: "rgb(3, 142, 220)" }}>{item.discount}$</p>
          <PlusMinusBtn
            count={item.count || 1}
            setCount={(data) => setCount(data)}
          />
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between gap-3 flex-column">
            {cartShowProducts}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>

      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        className="top-bar flex-wrap"
      >
        <div className="left-section d-flex " style={{ marginLeft: "10px" }}>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="70"
              className="d-inline-block align-top "
            />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Form className="d-flex align-items-center mt-4 search-bar">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary" size="sm">
              <FaSearch />
            </Button>
          </Form>
          <Nav className="align-items-center">
            <Nav.Link
              as={Link}
              to="#"
              className="nav-link-custom"
              onClick={toggleCategories}
            >
              Categories <FaAngleDown />
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link
          as={Link}
          to="#"
          className="nav-link-custom"
          onClick={toggleAccountMenu}
        >
          Account <FaAngleDown />
        </Nav.Link>
        {/* إضافة العربة بشكل مستقل خارج Navbar.Collapse */}
        <div
          onClick={handleShow}
          style={{ cursor: "pointer" }}
          className="nav-link-custom cart-link"
        >
          <FaShoppingCart /> Cart
        </div>
      </Navbar>

      {/* Dropdown قائمة الفئات */}
      <div className={`categories-dropdown ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <button className="close-button" onClick={toggleCategories}>
            <FaTimes /> {/* إضافة أيقونة الإغلاق */}
          </button>
        )}
        {loading ? (
          <SkeletonPage height="20px" width="1" count="1" Length="8" />
        ) : (
          categoriesShow
        )}
        <Link className="links-categories" to="/categories">
          Show All
        </Link>
      </div>

      {/* Dropdown قائمة الحساب */}
      <div className={`account-dropdown ${isAccountOpen ? "open" : ""}`}>
        <Link to="/login" className="links-account">
          Log In
        </Link>
        <Link to="/signup" className="links-account">
          Sign Up
        </Link>
      </div>
    </>
  );
}
