<script>
  import { game } from '../store/game.js';
  import { allCities, timer } from '../store/cities.js';
  
  import debounce from '../utils/debounce.js';
  import normalizeString from '../utils/normalizeString.js';
  import formatTime from '../utils/formatTime.js';

  let remainingCities,
    guessedCities = [],
    guessedNormalizedCities = [],
    timeIsUp = false,
    allCitiesLength = 0,
    guessingRatio = 0,
    inputDisabled = '';

  let subscribeCities = allCities.subscribe(value => {
    allCitiesLength = value.length;
    remainingCities = value;
  });

  let subscribeTime = timer.subscribe(value => {
    timeIsUp = value === 0;
    inputDisabled = timeIsUp && 'disabled';

    if (timeIsUp) {
      document.activeElement.blur();
      clearInput();
    }
  });

  function clearInput() {
    return document.getElementById('city-name').value = '';
  }

  function guessCity(event) {
    const { value } = event.target;
    const normalizedName = normalizeString(value).toLowerCase();

    document.querySelector('#guessed-cities li.highlight')
      && document.querySelector('#guessed-cities li.highlight').classList.remove('highlight');

    if (guessedNormalizedCities.lastIndexOf(normalizedName) > -1) {
      highlightCityAlreadyFound(guessedNormalizedCities.lastIndexOf(normalizedName));
    } else {
      searchCity(normalizedName);  
    }
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
    guessedCities = [...guessedCities, city.name];
    guessedNormalizedCities = [...guessedNormalizedCities, normalizeString(city.name).toLowerCase()];
    document.getElementById(`${city.id}`).classList.add('found');
    clearInput();

    guessingRatio = Math.round(guessedCities.length / allCitiesLength * 100);

    setTimeout(() => {
      document.getElementById('guessed-cities').scrollTop = document.getElementById('guessed-cities').scrollHeight;
    }, 100);
  }

  function highlightCityAlreadyFound(index) {
    const nthChild = index + 1;
    const item = document.querySelector(`#guessed-cities li:nth-child(${nthChild})`);

    item.classList.add('highlight');
    setTimeout(() => {
      document.getElementById('guessed-cities').scrollTop = index * 42;
    }, 100);
  }
</script>

<style>
.guessed-cities {
  height: 12rem;
  margin-top: 2rem;
  overflow-y: auto;
}

.guessed-cities li {
  position: relative;
  padding: .5rem;
  border: 1px solid #c1c1c1;
  border-radius: 2px;
  background-color: white;
}

.guessed-cities li + li {
  margin-top: .5rem;
}

.timer {
  font-size: 2rem;
  text-align: center;
}

.time-is-up {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  color: white;
  z-index: 1;
}

.time-is-up p {
  margin-bottom: 1rem;
}
</style>

<div class="page__game">
  <p class="timer">{formatTime($timer)}</p>

  <div class="page__search">
    <label for="city-name">Insira o nome da cidade:</label>
    <input type="text" id="city-name" name="city-name" placeholder="Digite aqui o nome da cidade" on:keyup={debounce(guessCity, 150)} autofocus class="{inputDisabled}">
  </div>

  <ol class="guessed-cities" id="guessed-cities">
    {#each guessedCities as city}
    <li>{ city }</li>
    {/each}
  </ol>

  {#if timeIsUp}
    <div class="time-is-up">
      <p>O tempo acabou! Você acertou {guessedCities.length} das {allCitiesLength} cidades; um total de {guessingRatio}%.</p>

      <button on:click={() => location.reload()}>Tentar novamente</button>
    </div>
  {/if}
</div>
