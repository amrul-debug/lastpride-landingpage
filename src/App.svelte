<script lang="ts">
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
</script>

<Header />

<main>
  <Router {routes} />
</main>

<Footer />