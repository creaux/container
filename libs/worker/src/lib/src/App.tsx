// eslint-disable-next-line @nx/enforce-module-boundaries
import { store } from '@creaux/container-store';
import { Provider } from 'react-redux';
import { Component } from './component.assess';

export default function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}
