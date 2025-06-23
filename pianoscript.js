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
