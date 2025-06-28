document.querySelectorAll('.audio-player').forEach(player => {
  const audio = player.querySelector('audio');
  const titleDiv = player.querySelector('.song-title');

  audio.addEventListener('play', () => {
    // holt sich den Titel aus dem title-Attribut des audio‑Elements
    titleDiv.textContent = `🎵 ${audio.title}`;
    titleDiv.classList.add('show');
  });
  audio.addEventListener('pause', () => {
    titleDiv.classList.remove('show');
  });
});