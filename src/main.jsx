import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import ListViewProvider from "@/context/ListVIewContext.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ListViewProvider>
        <App />
      </ListViewProvider>
    </AuthProvider>
  </StrictMode>,
);
