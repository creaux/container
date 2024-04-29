import * as ReactDOM from "react-dom/client";
import { createElement } from "react";
import { store } from "@creaux/container-store";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(createElement(App));

const channel = new MessageChannel();
parent.postMessage({ id: "@channel/container" }, "*", [channel.port2]);

// Communicates with enclosing parent .po
store.subscribe(() => {
  // FIXME: targetOrigin has to be adjusted for production
  channel.port1.postMessage(store.getState());
});
