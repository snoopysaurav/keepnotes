import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import Error404 from "../pages/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/keep",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
