import React, { useEffect, useState } from "react";
import TopRated from "./TopRated";
import { Axios } from "../../../../API/axios";
import { LastestSale, TopRatedAPI } from "../../../../API/API";
import SkeletonPage from "../../../../Components/Skeleton/SkeletonPage";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons"; // 659 (gzipped: 441)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 7.6k (gzipped: 3.1k)

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Axios.get(`${TopRatedAPI}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <TopRated
      key={product.id}
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale={product.sale}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      col_lg="12"
      col_md="12"
      id={product.id}
    />
  ));

  return (
    <div className="product-section p-4">
      <h2 className="text-center mb-4">
        Top Rated
        <FontAwesomeIcon style={{ color: "gold" }} icon={solid} />
      </h2>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap">
        {loading ? (
          <SkeletonPage
            height={"1000px"}
            width={"10"}
            count={"1"}
            Length={"1"}
          />
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
