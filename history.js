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

// curtain menu

let burger_button = document.querySelector('.burger-button');

let toggle = false;

function changeButton() {
  openNav();
  burger_button.innerHTML = '&times;';
  burger_button.style.fontSize = '36px';
}

function resetButton() {
  closeNav();
  burger_button.innerHTML = '&#9776;';
  burger_button.style.fontSize = '24px';
}

burger_button.addEventListener("click", () => {
  if(toggle) {
    resetButton();
  } 
  else {
    changeButton();
  }
  toggle = !toggle; // change value
});

/* Open */
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

/* Close */
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
// /curtain menu