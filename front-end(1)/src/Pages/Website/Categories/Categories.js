import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CAT } from "../../../API/API";
import { Container } from "react-bootstrap";
import StringSlice from "../../../Helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonPage from "../../../Components/Skeleton/SkeletonPage";

export default function CategoriesHome() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const showCategories = categories.map((item) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent-border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="ms-3" width="50px" src={item.image} alt="just an img" />
        <p className="m-0">{StringSlice(item.title, 12)}</p>
      </div>
    </div>
  ));
  return (
    <div
      className="py-2"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {" "}
      <Container style={{ maxWidth: "1200px" }}>
        <div style={{ textAlign: "center", color: "rgb(3, 142, 220)" }}>
          <h1>Categories Page</h1>
        </div>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
          {" "}
          {loading ? (
            <>
              {
                <SkeletonPage
                  height={"70px"}
                  width={"1"}
                  count={"8"}
                  Length={"10"}
                />
              }
            </>
          ) : (
            showCategories
          )}{" "}
        </div>{" "}
      </Container>{" "}
    </div>
  );
}
