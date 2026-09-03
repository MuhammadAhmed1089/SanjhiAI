import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/** Dismiss the HTML splash screen with a fade-out after minimum display time */
function dismissSplash(minMs = 1200) {
  const splash = document.getElementById('splash-root');
  if (!splash) return;

  const started = performance.now();

  function doHide() {
    const elapsed = performance.now() - started;
    const remaining = Math.max(0, minMs - elapsed);

    setTimeout(() => {
      splash.classList.add('hiding');
      splash.addEventListener('transitionend', () => {
        splash.classList.add('hidden');
      }, { once: true });
      // Fallback in case transitionend doesn't fire
      setTimeout(() => splash.classList.add('hidden'), 600);
    }, remaining);
  }

  // Wait for React to paint at least one frame
  requestAnimationFrame(() => requestAnimationFrame(doHide));
}

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

dismissSplash(1200);
