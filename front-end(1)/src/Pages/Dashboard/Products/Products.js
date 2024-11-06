import { useEffect, useState } from "react";
import { PROduct, PRODUCTS } from "../../../API/API";
import { Axios } from "../../../API/axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  console.log(products);
  const [loading, setLoading] = useState(false);
  const [NoUser, setNoUser] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
        .then((res) => {
          setProducts(res.data.data);
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
  }, [deleteUser, limit, page]);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/${PROduct}/${id}`).then((res) => console.log(res));
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
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "images",
      name: "images",
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
            Products Page
          </h2>
          <Link
            className="btn btn-primary"
            to="/dashboard/products/add"
            style={{
              backgroundColor: "#038edc",
              color: "white",
              marginTop: "10px",
              borderRadius: "0px",
            }}
          >
            Add Product
          </Link>
        </div>
        <TableShow
          header={header}
          data={products}
          delete={handleDelete}
          limit={limit}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          loading={loading}
          total={total}
          search="title"
          searchLink={PROduct}
        />
      </div>
    </>
  );
}
