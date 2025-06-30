// piano
/**
 * @source      https://www.geeksforgeeks.org/javascript/build-a-piano-using-html-css-and-javascript/
 */
const keys = document.querySelectorAll('.piano-keys');

// Creating a object of Audio with a default sound
const pianoSound = new Audio('./KeyNotes/C5.mp3');

keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const clickedKey = e.currentTarget.dataset.key;
        pianoSound.src = `./KeyNotes/${clickedKey}.mp3`;
        pianoSound.play();
    })
})
// / piano

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
