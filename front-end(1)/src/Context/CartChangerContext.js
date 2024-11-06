import { Children, createContext, useState } from "react";

export const Cart = createContext("");
export default function CArtChangerContext({ children }) {
  const [isChange, setIsChange] = useState(true);
  return (
    <Cart.Provider value={{ isChange, setIsChange }}>{children}</Cart.Provider>
  );
}
