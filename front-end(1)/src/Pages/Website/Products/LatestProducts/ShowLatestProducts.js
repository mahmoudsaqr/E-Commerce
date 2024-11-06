import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { Lastest, LastestSale } from "../../../../API/API";
import SaleProducts from "./../SaleProducts/SaleProducts";
import SkeletonPage from "../../../../Components/Skeleton/SkeletonPage";

export default function ShowLastestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${Lastest}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const productShow = products.map((item) => (
    <SaleProducts
      key={item.id}
      id={item.id}
      title={item.title}
      description={item.description}
      img={
        item.images && item.images.length > 0
          ? item.images[0].image
          : "path/to/default-image.jpg"
      }
      price={item.price}
      discount={item.discount}
      sale
      rating={item.rating}
      col_lg="6"
      col_md="12"
    />
  ));

  return (
    <div className="product-section p-4">
      <h2 className="text-center mb-4">Latest Products</h2>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap">
        {loading ? (
          <SkeletonPage height={"300px"} width={"3"} count={"1"} Length={"5"} />
        ) : (
          productShow
        )}
      </div>
    </div>
  );
}
