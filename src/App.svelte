<script>
  import Router from 'svelte-spa-router';
  
  import routes from './routes';
  import Nav from './components/Nav.svelte';
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<div class="page">
  <Nav />

  <div class="page__content">
    <Router {routes} />
  </div>
</div>
