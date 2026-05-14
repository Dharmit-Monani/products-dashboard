import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";  // NEW
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>          {/* NEW — wraps entire app */}
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </AuthProvider>         {/* NEW */}
    </BrowserRouter>
  </React.StrictMode>
);