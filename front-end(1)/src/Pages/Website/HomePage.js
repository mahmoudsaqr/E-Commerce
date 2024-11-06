import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Landing from "./Components/Landing";
import Footer from "./Components/Footer";
import ShowTopRated from "./Products/TopRated/ShowTopRated";
import ShowLastestSaleProduct from "./Products/SaleProducts/ShowLatestSaleProducts";
import ShowLastestProduct from "./Products/LatestProducts/ShowLatestProducts";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      {/* قسم البانر */}
      <Landing />

      {/* قسم المنتجات */}
      <Container style={{ maxWidth: "1400px", marginTop: "20px" }}>
        <ShowLastestSaleProduct />
      </Container>
      
      <Container style={{ maxWidth: "1400px", marginTop: "20px" }}>
        <Row
          style={{ marginTop: "20px" }}
          className="gx-3 gy-3 align-items-start"
        >
          {" "}
          {/* أضف align-items-start */}
          <Col md={6} xs={12}>
            <ShowTopRated />
          </Col>
          <Col md={6} xs={12} className="latest-sales-section">
            <ShowLastestProduct />
          </Col>
        </Row>
      </Container>

      {/* الفوتر */}
      <Footer />
    </>
  );
}
