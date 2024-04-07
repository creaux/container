import * as ReactDOM from "react-dom/client";
import { createElement } from "react";
import { store } from "@creaux/container-store";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(createElement(App));

// Communicates with enclosing parent window
store.subscribe(() => {
  // FIXME: targetOrigin has to be adjusted for production
  parent.postMessage(store.getState(), "http://localhost:3000");
});
