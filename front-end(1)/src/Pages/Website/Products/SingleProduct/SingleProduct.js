import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { Axios } from "../../../../API/axios";
import { PROduct } from "../../../../API/API";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import "react-image-gallery/styles/css/image-gallery.css"; // استيراد نمط مكتبة المعرض
import SkeletonPage from "../../../../Components/Skeleton/SkeletonPage";
import { Cart } from "../../../../Context/CartChangerContext";
import PlusMinusBtn from "../../Components/Btns/PlusMinusBtn";

export default function SingleProduct() {
  const [products, setProducts] = useState({});
  const [productsImages, setProductsImages] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const { setIsChange } = useContext(Cart);
  const roundStars = Math.round(products.rating || 0);
  const stars = Math.min(roundStars, 5);
  console.log(count);
  console.log(products);
  useEffect(() => {
    Axios.get(`${PROduct}/${id}`)
      .then((res) => {
        setProductsImages(
          res.data[0].images.map((item) => ({
            original: item.image,
            thumbnail: item.image,
          }))
        );
        setProducts(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, [id]);
  // handle Save To Cart
  function handleSaveToCart() {
    const getProducts =
      JSON.parse(window.localStorage.getItem("product")) || [];

    const productExist = getProducts.findIndex((pro) => pro.id == id);
    console.log(productExist);
    if (productExist !== -1) {
      if (getProducts[productExist].count) {
        getProducts[productExist].count += count;
      } else {
        getProducts[productExist].count = count;
      }
    } else {
      if (count > 1) {
        products.count = count;
      }
      getProducts.push(products);
    }
    console.log(getProducts);
    setIsChange((prev) => !prev);
    window.localStorage.setItem("product", JSON.stringify(getProducts));
  }
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon
      style={{ color: "gold", fontSize: "1.2rem" }}
      key={index}
      icon={solid}
    />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon
      style={{ color: "#ddd", fontSize: "1.2rem" }}
      key={index}
      icon={regularStar}
    />
  ));

  return (
    <div>
      {loading ? (
        <Container className="d-flex justify-content-start w-100">
          {
            <>
              <div className="w-100">
                <SkeletonPage
                  height={"600px"}
                  width={"10"}
                  count={"1"}
                  Length={"1"}
                />
              </div>
            </>
          }
        </Container>
      ) : (
        <Container style={{ maxWidth: "1300px" }} className="mt-5">
          <Row className="align-items-start justify-content-between">
            <Col lg={4} xs={12} className="mb-3">
              <ImageGallery items={productsImages} showThumbnails={true} />
            </Col>
            <Col lg={7} xs={12}>
              <h1 className="text-primary">{products.title}</h1>
              <p className="text-muted">{products.description}</p>

              <div className="d-flex align-items-center gap-2 mt-2">
                <h5>Rating:</h5>
                {showGoldStars}
                {showEmptyStars}
              </div>

              <div className="d-flex align-items-center gap-3 mt-3">
                <h5 className="text-success">{products.discount}$</h5>
                <h6
                  className="text-muted"
                  style={{ textDecoration: "line-through" }}
                >
                  {products.price}$
                </h6>
              </div>

              <div className="mt-4">
                <h4>About the Product:</h4>
                <p>{products.About}</p>
              </div>
              <div>
                <PlusMinusBtn setCount={(data) => setCount(data)} />
                <div
                  onClick={handleSaveToCart}
                  className="d-flex align-items-center justify-content-between gap-3 mt-3 border p-2 rounded"
                  style={{ width: "140px", cursor: "pointer" }}
                >
                  <img
                    src={require("../../../../images/pngtree-shopping-cart-convenient-icon-image_1287807.jpg")}
                    alt="cart"
                    width="20px"
                  />
                  <p
                    className="d-flex align-items-center"
                    style={{ margin: "0" }}
                  >
                    Add To Cart
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
