import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

// The built page already holds the content (scripts/prerender.js), so the
// browser adopts that markup instead of rebuilding it. In development the
// root is empty and the page is rendered from scratch.
const rootElement = document.getElementById("root");
const mount = rootElement.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
mount(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
