import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Save scroll position before page unloads (for reload)
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollPosBeforeReload", window.scrollY.toString());
  sessionStorage.setItem("reloadPath", window.location.pathname);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
