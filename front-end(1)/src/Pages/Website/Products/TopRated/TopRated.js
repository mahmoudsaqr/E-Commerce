import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"; // 915 (gzipped: 576)
import { faStar as solid } from "@fortawesome/free-solid-svg-icons"; // 659 (gzipped: 441)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 7.6k (gzipped: 3.1k)
import { NavLink } from "react-bootstrap";
// import StringSlice from "../../../../Helpers/StringSlice";

export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon style={{ color: "gold" }} key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  console.log(props.id);
  return (
    <NavLink
      href={`/product/${props.id}`}
      className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2"
    >
      <div
        className="col-md-4 col-12"
        style={{
          backgroundImage: `url('${props.img}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "170px",
        }}
      ></div>
      <div className="m-1 col-md-7 col-12 rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-4">
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