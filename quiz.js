const questions = [
    {
        question: "Wer ist der Frontmann von Metallica?",
        answers: [
            { text: "James Hetfield", correct: true },
            { text: "Taylor Swift", correct: false },
            { text: "Ronald Reagan", correct: false },
            { text: "Ozzy Osbourne", correct: false },
        ]
    },
    {
        question: "Welches Instrument ist in einer typischen Metal-Band am unwahrscheinlichsten zu finden?",
        answers: [
            { text: "E-Bass", correct: false },
            { text: "E‑Gitarre", correct: false },
            { text: "Schlagzeug", correct: false },
            { text: "Harfe", correct: true },
        ]
    },
    {
        question: "Wie viele Saiten hat ein typischer E‑Bass?",
        answers: [
            { text: "12", correct: false },
            { text: "2", correct: false },
            { text: "4", correct: true },
            { text: "π", correct: false },
        ]
    },
    {
        question: "Welches Subgenre gehört nicht zum Metal?",
        answers: [
            { text: "Thrash Metal", correct: false },
            { text: "Glam Rock", correct: true },
            { text: "Technical Death Metal", correct: false },
            { text: "Black Metal", correct: false },
        ]
    },
    {
        question: "Wer ist der Leadsänger von Lamb of God?",
        answers: [
            { text: "Randy Blythe", correct: true },
            { text: "Mr. Crabs", correct: false },
            { text: "Chris Adler", correct: false },
            { text: "Dave Mustaine", correct: false },
        ]
    },
    {
        question: "Welche dieser Metal‑Bands kommt aus Deutschland?",
        answers: [
            { text: "Necrophagist", correct: true },
            { text: "Megadeth", correct: false },
            { text: "Motörhead", correct: false },
            { text: "Judas Priest", correct: false },
        ]
    },
    {
        question: "Welchem Genre gehört Slayer an?",
        answers: [
            { text: "Thrash Metal", correct: true },
            { text: "Glam Metal", correct: false },
            { text: "Doom Metal", correct: false },
            { text: "Nu Metal", correct: false },
        ]
    },
    {
        question: "Welcher Teil einer E‑Gitarre liest die Schwingungen der Saiten und wandelt sie in Tonsignale um?",
        answers: [
            { text: "Tonabnehmer", correct: true },
            { text: "Hals", correct: false },
            { text: "Bundbrett", correct: false },
            { text: "Stimmmechaniken", correct: false },
        ]
    },
    {
        question: "Wie viele Töne befinden sich in einer Oktave?",
        answers: [
            { text: "666", correct: false },
            { text: "12", correct: true },
            { text: "24", correct: false },
            { text: "10", correct: false },
        ]
    },
    {
        question: "Was ermöglicht einer E‑Gitarre, lauter als eine Akustikgitarre zu sein?",
        answers: [
            { text: "Metronom", correct: false },
            { text: "Metall‑Saiten", correct: false },
            { text: "Verstärker", correct: true },
            { text: "Saitenzahl", correct: false },
        ]
    },
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
