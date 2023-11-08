const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue While", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Who invented the Telephone?",
        answer: [
            {text: "Alexander Fleming", correct: false},
            {text: "Thomas Alva Edison", correct: false},
            {text: "Alexander Graham Bell", correct: true},
            {text: "Johannes Gutenberg", correct: false}
        ]
    },
    {
        question: "Which is the hottest planet in our solar system?",
        answer: [
            {text: "Venus", correct: true},
            {text: "Earth", correct: false},
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: false}
        ]
    },
    {
        question: " When a number is multiplied by zero, the answer you get is always ____?",
        answer: [
            {text: "One", correct: false},
            {text: "Infinite", correct: false},
            {text: "NaN", correct: false},
            {text: "Zero", correct: true}
        ]
    },
    {
        question: "Who founded Facebook?",
        answer: [
            {text: "Fayshal", correct: false},
            {text: "Mark Zuckerberg", correct: true},
            {text: "Hablu", correct: false},
            {text: "Abul", correct: false}
        ]
    },
];

const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector("#answer_btns");
const nextBtn = document.querySelector("#next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(function(answer) {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);
        if(answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(function(btn) {
        if(btn.dataset.correct === "true") {
            btn.classList.add("correct")
        }
        btn.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } 
    else {
        showScore();
    }
}

nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})

startQuiz();