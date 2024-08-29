import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { DogCardsProvider } from "./providers/DogCardsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DogCardsProvider>
      <Toaster />
      <App />
    </DogCardsProvider>
  </React.StrictMode>
);
