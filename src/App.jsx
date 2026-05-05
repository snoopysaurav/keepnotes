import { Routes, Route, RouterProvider } from "react-router";
import { Home } from "./pages/Home";
import SignUp from "../src/components/auth/Signup";
import { router } from "./routes";
export default function App() {
  return <RouterProvider router={router} />;
}
