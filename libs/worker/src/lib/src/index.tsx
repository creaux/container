import App from './App';
import { createRoot } from 'react-dom/client';
import { store, ready, markup } from '@creaux/container-store';

new window.MutationObserver((mutations) => {
  for (const mutation of mutations) {
    store.dispatch(markup((mutation.target as HTMLElement).outerHTML));
    store.dispatch(ready());
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}).observe(window.document.getElementById('worker')!, {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(window.document.getElementById('worker')!).render(<App />);
