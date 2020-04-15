<script>
  import { Link } from "svelte-routing";
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
    <li><Link to="/">Início</Link></li>
    <li><Link to="sobre">Sobre</Link></li>
  </ul>
</nav>