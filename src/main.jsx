import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalState"; // Import GlobalProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider> {/* Wrap App with GlobalProvider */}
      <App />
    </GlobalProvider>
  </StrictMode>
);
