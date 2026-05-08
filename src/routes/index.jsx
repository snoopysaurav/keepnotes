import { createBrowserRouter } from "react-router";
import Keep from "../pages/Keep";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import Error404 from "../pages/Error404";
import ProtectedRoute from "../components/ProtectedRoute";
import ResetPassword from "../components/auth/ResetPassword";
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
    element: (
      <ProtectedRoute>
        <Keep />
      </ProtectedRoute>
    ),
  },

  {
    path: "reset-password",
    element: (
      <ProtectedRoute requirePasswordRecovery={true}>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
