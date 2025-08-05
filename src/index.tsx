import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThresholdProvider } from "./context/ThresholdContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThresholdProvider>
    <App />
  </ThresholdProvider>
);
