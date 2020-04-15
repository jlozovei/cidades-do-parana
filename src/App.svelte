<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";

  export let url = "";
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

<Router url="{url}">
  <nav class="menu">
    <Link to="/">Início</Link>
    <Link to="sobre">Sobre</Link>
  </nav>

  <div class="page">
    <Route path="sobre" component="{About}" />
    <Route path="/" component="{Home}" />
  </div>
</Router>
