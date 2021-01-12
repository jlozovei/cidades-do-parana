// Components
import Home from './pages/Home.svelte';
import About from './pages/About.svelte';
// import NotFound from './routes/NotFound.svelte';

// Export the route definition object
export default {
  '/': Home,
  '/sobre': About
  //   '*': NotFound
};
