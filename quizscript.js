let quizData = [
  {
    question: "Wer ist der Frontmann von Metallica?",
    options: ["James Hetfield", "Taylor Swift", "Ronald Reagan", "Ozzy Osbourne"],
    correct: "James Hetfield"
  },
  {
    question: "Welches Instrument ist in einer typischen Metal-Band am unwahrscheinlichsten zu finden?",
    options: ["E-Bass", "E‑Gitarre", "Schlagzeug", "Harfe"],
    correct: "Harfe"
  },
  {
    question: "Wie viele Saiten hat ein typischer E‑Bass?",
    options: ["12", "2", "4", "π"],
    correct: "4"
  },
  {
    question: "Welches Subgenre gehört nicht zum Metal?",
    options: ["Thrash Metal", "Glam Rock", "Technical Death Metal", "Black Metal"],
    correct: "Glam Rock"
  },
  {
    question: "Wer ist der Leadsänger von Lamb of God?",
    options: ["Randy Blythe", "Mr. Crabs", "Chris Adler", "Dave Mustaine"],
    correct: "Randy Blythe"
  },
  {
    question: "Welche dieser Metal‑Bands kommt aus Deutschland?",
    options: ["Necrophagist", "Megadeth", "Motörhead", "Judas Priest"],
    correct: "Necrophagist"
  },
  {
    question: "Welchem Genre gehört Slayer an?",
    options: ["Thrash Metal", "Glam Metal", "Doom Metal", "Nu Metal"],
    correct: "Thrash Metal"
  },
  {
    question: "Welcher Teil einer E‑Gitarre liest die Schwingungen der Saiten und wandelt sie in Tonsignale um?",
    options: ["Tonabnehmer", "Hals", "Bundbrett", "Stimmmechaniken"],
    correct: "Tonabnehmer"
  },
  {
    question: "Wie viele Töne befinden sich in einer Oktave?",
    options: ["666", "12", "24", "10"],
    correct: "12"
  },
  {
    question: "Was ermöglicht einer E‑Gitarre, lauter als eine Akustikgitarre zu sein?",
    options: ["Metronom", "Metall‑Saiten", "Verstärker", "Saitenzahl"],
    correct: "Verstärker"
  },
];
// DOMElement references
const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
let timerInterval;

// Shuffle helper function
const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

// Shuffle the quiz data at start
quizData = shuffleArray(quizData);

// Clear saved answers in localStorage
const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

// Check selected answer and update UI
const checkAnswer = (e) => {
  const userAnswer = e.target.textContent;
  const correctAnswer = quizData[questionNumber].correct;

  if (userAnswer === correctAnswer) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  // Disable all options after selection
  const allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((option) => {
    option.classList.add("disabled");
  });
};

// Create and display a question with options and timer
const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");
  timerDisplay.textContent = `Verbleibende Zeit: 10 Sekunden`;

  // Countdown timer
  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Verbliebende Zeit ${secondsLeft
      .toString()
      .padStart(2, "0")} Sekunden`;
    secondsLeft--;

    if (secondsLeft < 3) {
      timerDisplay.classList.add("danger");
    }

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  // Display question
  options.innerHTML = "";
  question.innerHTML = `<span class="question-number">${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  // Display shuffled answer options
  const shuffledOptions = shuffleArray(quizData[questionNumber].options);
  shuffledOptions.forEach((opt) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option");
    optionBtn.innerHTML = opt;
    optionBtn.addEventListener("click", checkAnswer);
    options.appendChild(optionBtn);
  });
};

// Show result screen with score and user answers
const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Sie haben ${score} aus ${MAX_QUESTIONS} Fragen richtig beantwortet.`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;
    const answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `
      <div class="question">Frage ${i + 1}: ${quizData[i].question}</div>
      <div class="user-answer">Ihre Antwort: ${userAnswer || "nicht beantwortet"}</div>
      <div class="correct-answer">Richtige Antwort: ${correctAnswer}</div>
    `;

    quizResult.appendChild(resultItem);
  }

  // "Wiederholen" button
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Wiederholen";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};

// Move to the next question or show results
const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
  } else {
    questionNumber++;
    createQuestion();
  }
};

// Restart the quiz from the beginning
const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

// Event listeners
nextBtn.addEventListener("click", displayNextQuestion);
startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});
//BigMac
function openNav() {
  const nav = document.getElementById("myNav");
  nav.classList.add("open");
  nav.setAttribute("aria-hidden", "false");
  // Optional: disable page scroll while menu open
  document.body.style.overflow = "hidden";
}

function closeNav() {
  const nav = document.getElementById("myNav");
  nav.classList.remove("open");
  nav.setAttribute("aria-hidden", "true");
  // Re-enable page scroll
  document.body.style.overflow = "";
}
