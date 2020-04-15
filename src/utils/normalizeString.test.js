import normalizeString from './normalizeString';

test('Normalize String', () => {
  const string = 'Itaperuçu';
  const normalized = normalizeString(string);

  expect(normalized).toBe('Itaperucu');
});
