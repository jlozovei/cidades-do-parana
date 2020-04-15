import { writable, readable } from 'svelte/store';

import { cities } from '../constants/cities.js';

let limit = 60 * 5;

export const allCities = writable(cities);

export const timer = readable(limit, function start(set) {
  const interval = setInterval(() => {
    limit = limit - 1;

    set(limit);

    limit === 0 && clearInterval(interval);
  }, 1000);
});
