import { Children, createContext, useEffect, useState } from "react";

export const WindowWidth = createContext("");
export default function WindowContext({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function resizeWindowWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", resizeWindowWidth);

    //CleanUp
    return () => {
      window.removeEventListener("resize", resizeWindowWidth);
    };
  }, []);
  return (
    <WindowWidth.Provider value={{ width, setWidth }}>
      {children}
    </WindowWidth.Provider>
  );
}
