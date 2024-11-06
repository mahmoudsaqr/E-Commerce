import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protector/RequireAuth";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Writer from "./Pages/Dashboard/Writer/Writer";
import Error404 from "./Pages/Auth/Error/404";
import RequireBack from "./Pages/Auth/Protector/RequireBack";
import Categories from "./Pages/Dashboard/Categories/Categories";
import AddCategory from "./Pages/Dashboard/Categories/AddCategory";
import UpdateCategory from "./Pages/Dashboard/Categories/UpdateCategory";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";
import CategoriesHome from "./Pages/Website/Categories/Categories";
import WebsiteDontRepeat from "./Pages/Website/WebsiteDon'tRepeat";
import SingleProduct from "./Pages/Website/Products/SingleProduct/SingleProduct";


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<WebsiteDontRepeat />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/categories" element={<CategoriesHome />}></Route>
          <Route path="/product/:id" element={<SingleProduct/>} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="/*" element={<Error404 />}></Route>
        {/* Protected Routes */}

        <Route
          path="/auth/google/callback"
          element={<GoogleCallBack />}
        ></Route>
        <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="users/:id" element={<UpdateUser />}></Route>
              <Route path="users/add" element={<AddUser />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              <Route path="categories" element={<Categories />}></Route>
              <Route path="categories/:id" element={<UpdateCategory />}></Route>
              <Route path="categories/add" element={<AddCategory />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              <Route path="products" element={<Products />}></Route>
              <Route path="products/:id" element={<UpdateProduct />}></Route>
              <Route path="products/add" element={<AddProduct />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
              <Route path="writer" element={<Writer />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path="/404" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
