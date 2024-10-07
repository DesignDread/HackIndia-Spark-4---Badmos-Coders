import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initGA } from "./analytics.js";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; 
import { Toaster } from "sonner";
import ContractProvider from "./context";

// Initialize Google Analytics
initGA();

const root = ReactDOM.createRoot(document.getElementById("root"));

// Function to log page views
// const logPageViewOnRender = () => {
//   logPageView();
// };

// Render the app
root.render(
  <React.StrictMode>
    <ContractProvider>
      <Router>
        <App />
      </Router>
    </ContractProvider>
  </React.StrictMode>
);
