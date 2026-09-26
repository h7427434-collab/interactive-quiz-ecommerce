const questions = [
    {
        question: "Which language is used to structure a web page?",
        answers: ["CSS", "HTML", "Python", "C++"],
        correct: "HTML"
    },
    {
        question: "Which language is used to style web pages?",
        answers: ["HTML", "CSS", "Java", "SQL"],
        correct: "CSS"
    },
    {
        question: "Which language makes web pages interactive?",
        answers: ["HTML", "CSS", "JavaScript", "C"],
        correct: "JavaScript"
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        answers: ["var", "let", "const", "define"],
        correct: "const"
    },
    {
        question: "Which method is commonly used to select an element by ID?",
        answers: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "findElement()"
        ],
        correct: "getElementById()"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextBtn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    answersElement.innerHTML = "";

    current.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer";

        button.addEventListener("click", () => {
            checkAnswer(button, answer);
        });

        answersElement.appendChild(button);
    });

    nextButton.style.display = "none";
}

function checkAnswer(button, answer) {
    const correctAnswer = questions[currentQuestion].correct;
    const allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach(btn => {
        btn.disabled = true;
    });

    if (answer === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");

        allAnswers.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.textContent =
        `Your score is ${score} out of ${questions.length}.`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    loadQuestion();
}

loadQuestion();
