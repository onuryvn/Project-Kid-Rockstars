document.getElementById("prev").addEventListener("click", () => {
    plusSlides(-1)
});
document.getElementById("next").addEventListener("click", () => {
    plusSlides(1)
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Dot image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// curtain menu

let burger_button = document.getElementById('burger_button');

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


// swipe

let container = document.getElementById('slideshow-container');

let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if(touchendX < touchstartX) plusSlides(1);
  if(touchendX > touchstartX) plusSlides(-1);
}

container.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

container.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

// /swipe


function setRealVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setRealVh();
window.addEventListener('resize', setRealVh);