import { useCallback, useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { RouterProvider } from "react-router-dom";
import { themeConfig } from "./themeConfig";
import axios from "axios";
import { router } from "./routes";

function App() {
  axios.defaults.withCredentials = true;
  const [theme, setTheme] = useState("light");

  const changeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    message.loading({
      content: `Switching to ${newTheme} mode...`,
      key: "theme",
    });

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    setTimeout(() => {
      message.success({
        content: `Switched to ${newTheme} mode`,
        key: "theme",
        duration: 2,
      });
    }, 800);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      localStorage.setItem("theme", theme);
    } else {
      setTheme(storedTheme);
    }
  }, [changeTheme]);

  return (
    <ConfigProvider theme={themeConfig[theme]}>
      <RouterProvider router={router(changeTheme)} />
    </ConfigProvider>
  );
}

export default App;
