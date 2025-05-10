import Home from './pages/Home.svelte';
import Features from './pages/Features.svelte';
import Gallery from './pages/Gallery.svelte';
import HowToJoin from './pages/HowToJoin.svelte';
import NotFound from './pages/NotFound.svelte';

const routes = {
  '/': Home,
  '/features': Features,
  '/gallery': Gallery,
  '/how-to-join': HowToJoin,
  '*': NotFound,
};

export default routes;