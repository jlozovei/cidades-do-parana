function zeroPadded(number) {
  return number >= 10 ? number.toString() : `0${number}`;
}

function formatTime(seconds) {
  const mm = Math.floor(seconds / 60);
  const ss = seconds - Math.floor(seconds / 60) * 60;

  return `${zeroPadded(mm)}:${zeroPadded(ss)}`;
}

export default formatTime;
