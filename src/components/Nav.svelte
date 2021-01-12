<script>
  import { link } from 'svelte-spa-router';
</script>

<style>
.menu {
  padding: 1rem 0 2rem;
  text-align: right;
}

.menu ul li {
  display: inline-block;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: .2px;
}

.menu ul li + li {
  margin-left: 1rem;
}
</style>

<nav class="menu">
  <ul>
    <li>
      <a use:link href="/">Início</a>
    </li>
    <li>
      <a use:link href="/sobre">Sobre</a>
    </li>
  </ul>
</nav>