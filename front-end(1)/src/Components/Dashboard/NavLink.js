import { faPen, faPlus, faShop, faTruck, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "/dashboard/users/add",
    icon: faPlus,
    role: ["1995"],
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faShop,
    role: ["1999", "1995"],
  },
  {
    name: "Add Category",
    path: "/dashboard/categories/add",
    icon: faPlus,
    role: ["1999", "1995"],
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faTruck,
    role: ["1999", "1995"],
  },
  {
    name: "Add Product",
    path: "/dashboard/products/add",
    icon: faPlus,
    role: ["1999", "1995"],
  },
  {
    name: "Writer",
    path: "/dashboard/writer",
    icon: faPen,
    role: ["1995", "1996"],
  },
];
