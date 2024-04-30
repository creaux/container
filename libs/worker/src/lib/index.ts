import './dom';
import './src';
import { store, code } from '@creaux/container-store';

// Dispatch code into the store
store.dispatch(code((await import('./src/component.assess.tsx?raw')).default));

onmessage = () => {
  // store.dispatch(push(message.data.router.location?.pathname || '/'));
};

store.subscribe(() => {
  postMessage(store.getState());
});
