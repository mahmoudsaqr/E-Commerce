import { useEffect, useState } from "react";
import { CAT, CATegory } from "../../../API/API";
import { Axios } from "../../../API/axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import TableShow from "../../../Components/Dashboard/Table";
import { Form } from "react-bootstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [NoUser, setNoUser] = useState(false);
  console.log(categories);
  const navigator = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
        .then((res) => {
          setCategories(res.data.data);
          setTotal(res.data.total);
          setLoading(false);
          console.log(res);
        })
        .then(() => setNoUser(true));
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  }, [limit, page, deleteUser]);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/${CATegory}/${id}`).then((res) => console.log(res));
      setDeleteUser((prev) => !prev);
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  }

  // const userFilter = users.filter((user) => user.id !== currentUser.id);
  // console.log(userFilter);
  // console.log(currentUser);
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created At",
    },
    {
      key: "updated_at",
      name: "Updated At",
    },
  ];

  return (
    <>
      {loading && <Loading />}
      <div className="w-100 p-2 bg-white">
        <div
          style={{ marginBottom: "30px" }}
          className="d-flex align-items-center justify-content-between"
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5em",
              fontWeight: "bold",
              color: "#333",
              margin: "auto",
            }}
          >
            Categories Page
          </h2>
          <Link
            className="btn btn-primary"
            to="/dashboard/categories/add"
            style={{
              backgroundColor: "#038edc",
              color: "white",
              marginTop: "10px",
              borderRadius: "0px",
            }}
          >
            Add Category
          </Link>
        </div>

        <TableShow
          limit={limit}
          page={page}
          header={header}
          data={categories}
          delete={handleDelete}
          setPage={setPage}
          setLimit={setLimit}
          loading={loading}
          total={total}
          search="title"
          searchLink={CATegory}
        />
      </div>
    </>
  );
}
