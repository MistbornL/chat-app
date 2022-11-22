import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: "https://app-7phnkm6bkycj.frontegg.com",
  clientId: "2ed19f97-322c-4d16-a915-60b3aeb2735f",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FronteggProvider>
);
