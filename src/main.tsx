import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if ('caches' in window) {
      caches
        .keys()
        .then((keys) => {
          keys.forEach((key) => {
            if (key !== 'unitswift-pwa-v3-105') {
              caches.delete(key);
            }
          });
        })
        .catch(() => {});
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch(() => {
        // Ignore registration errors in restricted iframe contexts
      });
  });
}
