import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
