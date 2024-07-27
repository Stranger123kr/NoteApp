import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        newestOnTop={false}
        pauseOnHover={false}
        rtl={false}
        theme="dark"
        transition={Bounce}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
