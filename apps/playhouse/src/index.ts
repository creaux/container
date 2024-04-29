import * as ReactDOM from "react-dom/client";
import { createElement } from "react";
import { store } from "@creaux/container-store";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(createElement(App));

const channel = new MessageChannel();

// FIXME: targetOrigin has to be adjusted for production
parent.postMessage({ id: "container-channel" }, "http://localhost:3000", [
  channel.port2,
]);

// Communicates with enclosing parent
store.subscribe(() => {
  channel.port1.postMessage(store.getState());
});
