import { Provider } from 'react-redux';
import { store } from '../../../../libs/store/src';
import { Component } from './component.assess';

export function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

export default App;
