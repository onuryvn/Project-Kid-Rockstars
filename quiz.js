const questions = [
  {
    question: "Who is the frontman of Metallica?",
    answers: [
      { text: "James Hetfield", correct: true },
      { text: "Taylor Swift", correct: false },
      { text: "Ronald Reagan", correct: false },
      { text: "Ozzy Osbourne", correct: false },
    ]
  },
  {
    question: "Which instrument is least likely to be found in a typical metal band?",
    answers: [
      { text: "Electric bass", correct: false },
      { text: "Electric guitar", correct: false },
      { text: "Drums", correct: false },
      { text: "Harp", correct: true },
    ]
  },
  {
    question: "How many strings does a typical electric bass have?",
    answers: [
      { text: "12", correct: false },
      { text: "2", correct: false },
      { text: "4", correct: true },
      { text: "π", correct: false },
    ]
  },
  {
    question: "Which subgenre does not belong to metal?",
    answers: [
      { text: "Thrash Metal", correct: false },
      { text: "Glam Rock", correct: true },
      { text: "Technical Death Metal", correct: false },
      { text: "Black Metal", correct: false },
    ]
  },
  {
    question: "Who is the lead singer of Lamb of God?",
    answers: [
      { text: "Randy Blythe", correct: true },
      { text: "Mr. Krabs", correct: false },
      { text: "Chris Adler", correct: false },
      { text: "Dave Mustaine", correct: false },
    ]
  },
  {
    question: "Which of these metal bands comes from Germany?",
    answers: [
      { text: "Necrophagist", correct: true },
      { text: "Megadeth", correct: false },
      { text: "Motörhead", correct: false },
      { text: "Judas Priest", correct: false },
    ]
  },
  {
    question: "What genre does Slayer belong to?",
    answers: [
      { text: "Thrash Metal", correct: true },
      { text: "Glam Metal", correct: false },
      { text: "Doom Metal", correct: false },
      { text: "Nu Metal", correct: false },
    ]
  },
  {
    question: "Which part of an electric guitar reads the string vibrations and converts them into audio signals?",
    answers: [
      { text: "Pickup", correct: true },
      { text: "Neck", correct: false },
      { text: "Fretboard", correct: false },
      { text: "Tuning pegs", correct: false },
    ]
  },
  {
    question: "How many notes are there in one octave?",
    answers: [
      { text: "666", correct: false },
      { text: "12", correct: true },
      { text: "24", correct: false },
      { text: "10", correct: false },
    ]
  },
  {
    question: "What allows an electric guitar to be louder than an acoustic guitar?",
    answers: [
      { text: "Metronome", correct: false },
      { text: "Metal strings", correct: false },
      { text: "Amplifier", correct: true },
      { text: "Number of strings", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

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