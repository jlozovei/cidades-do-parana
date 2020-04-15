<script>
  import { game } from '../store/game.js';
  import Game from "../components/Game.svelte";
  import Map from "../components/Map.svelte";

  let hasGameStarted;

  const subscribe = game.subscribe(value => {
    hasGameStarted = value;
  });
</script>

<h1 class="page__title">Cidades do Paraná</h1>

<div class="page__map">
  <Map />
</div>

{#if hasGameStarted}
  <Game />
{:else}
  <div class="page__text">
    <p>O Paraná tem 399 municípios; você conhece todos eles? Teste seu conhecimento sobre o nosso estado nesse jogo.</p>
    <p>Como jogar:</p>

    <ul>
      <li>Escreva o nome da cidade no campo indicado - se você acertar, a localização será mostrada no mapa;</li>
      <li>Não precisa utilizar acentos gráficos nos nomes dos municípios;</li>
      <li>Você tem 5 minutos para jogar;</li>
      <li>No final do jogo, você poderá ver a sua pontuação e tentar novamente!</li>
    </ul>

    <p>Preparado?</p>

    <button on:click={game.start}>Começar</button>
  </div>
{/if}
