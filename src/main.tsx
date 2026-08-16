import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

document.body.style.background = "#0a0e14";
document.body.style.color = "#e2e8f0";
document.body.style.margin = "0";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
