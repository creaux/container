import { Provider } from 'react-redux';
import { store, code } from '@creaux/container-store';
import { Component } from './component.assess';

// Add component which is executed to the store
store.dispatch(code((await import('./component.assess.tsx?raw')).default));

export function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

export default App;
