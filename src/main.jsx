import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import ListViewProvider from "@/context/ListVIewContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ListViewProvider>
      <App />
    </ListViewProvider>
  </StrictMode>,
);
