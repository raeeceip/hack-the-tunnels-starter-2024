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
  Workshop,
  MyProgress
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
    path: "/personal-information",
    element: <Menu />,
  },
  {
    path: "/student-services",
    element: <Menu />,
  },
  {
    path: "/employee-services",
    element: <Menu />,
  },
  {
    path: "/financial-services",
    element: <Menu />,
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
    path: "/workshop",
    element: <Workshop />,
  },
  {
    path: "/myprogress",
    element : <MyProgress />,
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
