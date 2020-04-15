import App from './App.svelte';

const app = new App({
  target: document.getElementById('game'),
  hydratable: true
});

export default app;
