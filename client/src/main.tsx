import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import {
  BuildTimetable,
  Menu,
  Login,
  NotFound,
  Timetables,
  ViewTimetable,
} from "@/pages";
import { AccountProvider } from "./context";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/timetables",
    element: <Timetables />,
  },
  {
    path: "/timetables/build",
    element: <BuildTimetable />,
  },
  {
    path: "/timetables/:id",
    element: <ViewTimetable />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function Root() {
  const [cookie] = useCookies(["jwt"]);

  return (
    <AccountProvider storedToken={cookie.jwt}>
      <RouterProvider router={router} />
    </AccountProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <Root />
    </CookiesProvider>
  </React.StrictMode>,
);
