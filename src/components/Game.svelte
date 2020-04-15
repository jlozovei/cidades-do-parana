<script>
  import { game } from '../store/game.js';
  import { allCities, timer } from '../store/cities.js';
  
  import debounce from '../utils/debounce.js';
  import normalizeString from '../utils/normalizeString.js';

  let remainingCities,
    guessedCities = [],
    timeIsUp = false,
    allCitiesLength = 0,
    guessingRatio = 0;

  let subscribeCities = allCities.subscribe(value => {
    allCitiesLength = value.length;
    remainingCities = value;
  });

  let subscribeTime = timer.subscribe(value => {
    timeIsUp = value === 0;
  });

  function guessCity(event) {
    const { value } = event.target;
    const normalizedName = normalizeString(value).toLowerCase();
    
    searchCity(normalizedName);
  }

  function searchCity(term) {
    for (const [index, city] of remainingCities.entries()) {
      const normalizedName = normalizeString(city.name).toLowerCase();

      if (normalizedName === term) {
        remainingCities.splice(index, 1);
        return hasFoundCity(city);
        break;
      }
    }
  }

  function hasFoundCity(city) {
    guessedCities = [...guessedCities, city];
    document.getElementById(`${city.id}`).classList.add('found');
    document.getElementById('city-name').value = '';

    guessingRatio = Math.round(guessedCities.length / allCitiesLength * 100);
  }
</script>

<div class="page__game">
  <p>{$timer}</p>
  <label for="city-name">Insira o nome da cidade</label>
  <input type="text" id="city-name" name="city-name" placeholder="Insira o nome da cidade" on:keyup={debounce(guessCity, 150)} autofocus>

  <ul class="guessed-cities">
    {#each guessedCities as city}
    <li>{ city.name }</li>
    {/each}
  </ul>

  {#if timeIsUp}
    <div class="time-is-up">
      O tempo acabou!
      Você acertou {guessedCities.length} cidades das {allCitiesLength}; um total de {guessingRatio}%.

      <button on:click={() => location.reload()}>Tentar novamente</button>
    </div>
  {/if}
</div>
