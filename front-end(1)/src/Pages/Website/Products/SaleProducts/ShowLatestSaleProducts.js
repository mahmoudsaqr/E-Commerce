import { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { LastestSale, PRODUCTS } from "../../../../API/API";
import SaleProducts from "./SaleProducts";
import StringSlice from "../../../../Helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonPage from "../../../../Components/Skeleton/SkeletonPage";

export default function LastestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(products);
  useEffect(() => {
    Axios.get(`${LastestSale}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);
  const productShow = products.map((item) => (
    <SaleProducts
      title={item.title}
      id={item.id}
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
      col_lg="3"
      col_md="6"
    />
  ));
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px", color: "#0D6EFD" }}>
        Latest Sales Products
      </h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap">
        {loading ? (
          <>
            {
              <SkeletonPage
                height={"300px"}
                width={"3"}
                count={"1"}
                Length={"5"}
              />
            }
          </>
        ) : (
          productShow
        )}
      </div>
    </>
  );
}
