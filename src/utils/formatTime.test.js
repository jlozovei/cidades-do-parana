import formatTime from './formatTime';

test('Format Time', () => {
  const time = 60 * 5;
  const formatted = formatTime(time);

  expect(formatted).toBe('05:00');
});
