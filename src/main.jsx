import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalState"; // Import GlobalProvider
import { CurrencyProvider } from "./context/CurrencyContext"; // Import CurrencyProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider> {/* Wrap App with GlobalProvider */}
      <CurrencyProvider> {/* Wrap with CurrencyProvider */}
        <App />
      </CurrencyProvider>
    </GlobalProvider>
  </StrictMode>
);
