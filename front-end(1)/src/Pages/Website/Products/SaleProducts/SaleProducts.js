import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"; // 915 (gzipped: 576)
import { faStar as solid } from "@fortawesome/free-solid-svg-icons"; // 659 (gzipped: 441)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 7.6k (gzipped: 3.1k)
import StringSlice from "../../../../Helpers/StringSlice";
import { NavLink } from "react-bootstrap";

export default function Product(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon style={{ color: "gold" }} key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  return (
    <NavLink
      href={`/product/${props.id}`}
      className={`col-lg-${props.col_lg} col-md-${props.col_md} col-12`}
    >
      <div className="m-1 border rounded p-3 h-100">
        <div className="border-bottom pb-3">
          <p
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {StringSlice(props.title, 35)}
          </p>
          <p
            style={{
              color: "gray",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {StringSlice(props.description, 35)}
          </p>

          <div className="px-5 py-4 position-relative">
            {props.sale && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                style={{
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                }}
              >
                Sale
              </p>
            )}

            <img
              src={props.img}
              alt=""
              className="img-fluid"
              style={{ width: "100%", height: "150px" }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {showEmptyStars}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../images/pngtree-shopping-cart-convenient-icon-image_1287807.jpg")}
              alt="cart"
              width="20px"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
