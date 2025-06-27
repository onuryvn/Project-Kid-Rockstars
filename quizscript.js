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
//DOM-Elemente wird referenziert
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

/*function um Fragen und Antworten zu mischen*/
const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);
//Antworten loschen
const resetLocalStorage = () => {
  for (i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();
/*pruft antwort und speichert es in liste*/
const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};
//Timer und Options
const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Verbleibende Zeit: 10 Sekunden`;

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

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${
    questionNumber + 1
  }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    options.appendChild(option);
  });
};
//wiederholen
const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Sie haben ${score} aus ${MAX_QUESTIONS} Fragen richtig beantwortet.`;
  quizResult.appendChild(resultHeading);

  /* for loop um jede Antwort zu prufen und zeigen*/
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;

    let answeredCorrectly = userAnswer === correctAnswer;
    
    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `<div class="question">Frage ${i + 1}: ${
      quizData[i].question
    }</div>
    <div class="user-answer">Ihre Antwort: ${userAnswer || "nicht beantwortet"}</div>
    <div class="correct-answer">Richtige Antwort ${correctAnswer}</div>`;

    quizResult.appendChild(resultItem);
  }

  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Wiederholen";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
  //return button
  const returnLink = document.createElement("a");
  returnLink.href = "index.html";
  returnLink.classList.add("return-btn");
  returnLink.textContent = "Zurück";
  quizResult.appendChild(returnLink);
};


const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};
nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});
