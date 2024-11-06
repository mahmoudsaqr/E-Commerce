import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormSelect, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Table.css"; // تأكد من وجود هذا الملف لكتابة CSS مخصص
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import TransformDate from "../../Helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || { name: "" };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterdData, setFilteredData] = useState([]);
  console.log(props.data);
  const filterDate_Data = props.data.filter(
    (item) => TransformDate(item.created_at) === date
  );
  const filterSearchByDate = filterdData.filter(
    (item) => TransformDate(item.created_at) === date
  );
  console.log(filterDate_Data);

  const showWhichData =
    date.length !== 0
      ? search.length > 0
        ? filterSearchByDate
        : filterDate_Data
      : search.length > 0
      ? filterdData
      : props.data;
      
  // const paginateData = [];
  // if(props.data.length !== 0){
  //   for (
  //     let index = (props.page - 1) * props.limit;
  //     index < props.page * props.limit;
  //     index++
  //   ) {
  //     paginateData.push(props.data[index]);
  //   }
  // }

  //pagination by Front End
  // const dataPaginated = props.data.slice(
  //   (props.page - 1) * props.limit,
  //   props.page * props.limit
  // );

  //search and filter data in front end
  // const filterdData = props.data.filter((item) =>
  //   item[props.search].toLowerCase().includes(search.toLowerCase())
  // );
  async function getSearchData() {
    try {
      const res = await Axios.post(
        `/${props.searchLink}/search?title=${search}`
      );

      console.log(res);
      setFilteredData(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false);
    }, 800);
    return () => clearTimeout(debounce);
  }, [search]);
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function handleDate(e) {
    setDate(e.target.value);
  }
  const showHeaders = props.header.map((item, key) => (
    <th
      key={key}
      className="table-header"
      style={{ backgroundColor: "#038edc", color: "white" }}
    >
      {item.name}
    </th>
  ));

  const dataShow = showWhichData.map((item, key) => (
    <tr key={key} className="table-row">
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manager"
          ) : item2.key === "image" ? (
            <img src={`${item[item2.key]}`} className="profile-image" alt="" />
          ) : item2.key === "images" ? (
            item[item2.key].map((img, index) => (
              <img
                key={index}
                src={`${img.image}`}
                className="thumbnail-image"
                alt=""
              />
            ))
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(`${item[item2.key]}`)
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td
        className="action-column"
        style={{
          whiteSpace: "nowrap",
          width: "auto",
          height: props.height ? props.height : "100px",
        }}
      >
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            className="action-icon edit-icon"
            icon={faPenToSquare}
          />
        </Link>
        {currentUser.name !== item.name && (
          <FontAwesomeIcon
            onClick={() => props.delete(item.id)}
            className="action-icon delete-icon"
            icon={faTrash}
          />
        )}
      </td>
    </tr>
  ));
  return (
    <div className="table-responsive">
      <div className="col-3">
        <Form.Control
          className="my-2"
          type="search"
          value={search}
          aria-label="input example"
          placeholder="search"
          onChange={(e) => {
            handleSearch(e);
            setSearchLoading(true);
          }}
        />
      </div>
      <div className="col-2">
        <Form.Control
          className="my-2"
          type="date"
          value={date}
          aria-label="input example"
          placeholder="search"
          onChange={(e) => {
            handleDate(e);
            // setSearchLoading(true);
          }}
        />
      </div>

      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th
              style={{ backgroundColor: "#038edc", color: "white" }}
              className="table-header"
            >
              ID
            </th>
            {showHeaders}
            <th
              style={{ backgroundColor: "#038edc", color: "white" }}
              className="table-header"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="table-row">
              <td colSpan={12} style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : searchLoading ? (
            <tr className="table-row">
              <td colSpan={12} style={{ textAlign: "center" }}>
                Searching...
              </td>
            </tr>
          ) : filterdData.length === 0 && search.length > 0 ? (
            <tr className="table-row">
              <td colSpan={12} style={{ textAlign: "center" }}>
                No results
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-center">
        <p style={{ marginTop: "10px", marginRight: "5px" }}>
          Items Per Page :{" "}
        </p>
        <FormSelect
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          style={{ width: "10%" }}
          onChange={(e) => props.setLimit(e.target.value)}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </FormSelect>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        />
      </div>
    </div>
  );
}
