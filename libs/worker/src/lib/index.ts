import './dom';
import './src';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { store } from '@creaux/container-store';

onmessage = (message: MessageEvent) => {
  // store.dispatch(push(message.data.router.location?.pathname || '/'));
};

store.subscribe(() => {
  postMessage(store.getState());
});
