import { useEffect, useState } from "react";
import { USER, USERS } from "../../../API/API";

import { Axios } from "../../../API/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import TableShow from "../../../Components/Dashboard/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);
  const [NoUser, setNoUser] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    try {
      Axios.get(`/${USER}`).then((res) => {
        setCurrentUser(res.data);
      });
    } catch (err) {}
  }, []);
  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data)
          setTotal(res.data.total);
          setLoading(false);
        })
        .then(() => setNoUser(true));
    } catch (err) {
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  }, [deleteUser, limit, page]);

  function handleDelete(id) {
    if (currentUser.id !== id) {
      try {
        Axios.delete(`/${USER}/${id}`).then((res) => console.log(res));
        setDeleteUser((prev) => !prev);
      } catch (err) {
        if (err.response.status === 401) {
          navigator("/login");
        }
      }
    }
  }

  // const userFilter = users.filter((user) => user.id !== currentUser.id);
  // console.log(userFilter);
  // console.log(currentUser);
  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
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
  // const showUsers = users.map((users, key) => (
  //   <tr key={key}>
  //     <td>{key + 1}</td>
  //     <td>
  //       {users.name === currentUser.name ? users.name + " (You)" : users.name}
  //     </td>
  //     <td>{users.email}</td>
  //     <td>
  //       {users.role === "1995"
  //         ? "Admin"
  //         : users.role === "2001"
  //         ? "User"
  //         : "Writer"}
  //     </td>
  //     <td className="d-flex justify-content-center align-items-center gap-4">
  //       <Link to={`${users.id}`}>
  //         <FontAwesomeIcon
  //           fontSize={"20px"}
  //           color="#038edc"
  //           cursor={"pointer"}
  //           icon={faPenToSquare}
  //         />
  //       </Link>
  //       {currentUser.id !== users.id && (
  //         <FontAwesomeIcon
  //           onClick={() => handleDelete(users.id)}
  //           fontSize={"20px"}
  //           cursor={"pointer"}
  //           color="red"
  //           icon={faTrash}
  //         />
  //       )}
  //     </td>
  //   </tr>
  // ));
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
            Users Page
          </h2>
          <Link
            className="btn btn-primary"
            to="/dashboard/users/add"
            style={{
              backgroundColor: "#038edc",
              color: "white",
              marginTop: "10px",
              borderRadius: "0px",
            }}
          >
            Add User
          </Link>
        </div>
        <TableShow
          header={header}
          data={users}
          delete={handleDelete}
          currentUser={currentUser}
          height={"50px"}
          limit={limit}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          loading={loading}
          total={total}
          search="name"
          searchLink={USER}
        />
      </div>
    </>
  );
}
