// Initialize variables
const questionEl = document.getElementById('question');
const choiceContainers = Array.from(document.querySelectorAll('.choice-container'));
const scoreEl = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions Array - 50 questions
const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        choice1: "<script href='script.js'>",
        choice2: "<script name='script.js'>",
        choice3: "<script src='script.js'>",
        choice4: "<script file='script.js'>",
        answer: 3,
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: "Which of the following is the correct syntax to add a comment in JavaScript?",
        choice1: "// This is a comment",
        choice2: "<!-- This is a comment -->",
        choice3: "' This is a comment",
        choice4: "# This is a comment",
        answer: 1,
    },
    {
        question: "Which symbol is used for comments in CSS?",
        choice1: "/* comment */",
        choice2: "// comment",
        choice3: "# comment",
        choice4: "<!-- comment -->",
        answer: 1,
    },
    {
        question: "Which HTML element is used to define the title of the document?",
        choice1: "<header>",
        choice2: "<title>",
        choice3: "<meta>",
        choice4: "<h1>",
        answer: 2,
    },
    {
        question: "Which property is used to change the background color of an element in CSS?",
        choice1: "background-color",
        choice2: "color",
        choice3: "bg-color",
        choice4: "background",
        answer: 1,
    },
    {
        question: "What does CSS stand for?",
        choice1: "Cascading Style Sheets",
        choice2: "Creative Style Sheets",
        choice3: "Computer Style Sheets",
        choice4: "Colorful Style Sheets",
        answer: 1,
    },
    {
        question: "How can we make a list that lists items with numbers?",
        choice1: "<ul>",
        choice2: "<list>",
        choice3: "<ol>",
        choice4: "<dl>",
        answer: 3,
    },
    {
        question: "Which tag is used to define an internal style sheet in HTML?",
        choice1: "<css>",
        choice2: "<style>",
        choice3: "<script>",
        choice4: "<link>",
        answer: 2,
    },
    {
        question: "What does HTML stand for?",
        choice1: "HyperText Markup Language",
        choice2: "HyperTransfer Markup Language",
        choice3: "HomeTool Markup Language",
        choice4: "HyperTextual Markup Language",
        answer: 1,
    },
    {
        question: "Which HTML element is used for embedding a video?",
        choice1: "<video>",
        choice2: "<embed>",
        choice3: "<source>",
        choice4: "<movie>",
        answer: 1,
    },
    {
        question: "How do you select an element with the ID 'demo' in JavaScript?",
        choice1: "document.getElementById('demo')",
        choice2: "document.querySelector('#demo')",
        choice3: "document.getElementByClassName('demo')",
        choice4: "document.querySelector('.demo')",
        answer: 1,
    },
    {
        question: "Which of the following is used to define an anchor link in HTML?",
        choice1: "<button>",
        choice2: "<a>",
        choice3: "<link>",
        choice4: "<img>",
        answer: 2,
    },
    {
        question: "What is the correct syntax for creating a table in HTML?",
        choice1: "<table><tr><td></td></tr></table>",
        choice2: "<table><row><td></td></row></table>",
        choice3: "<table><tr><th></th></tr></table>",
        choice4: "<table><row><th></th></row></table>",
        answer: 1,
    },
    {
        question: "Which of these properties is used to change the font size in CSS?",
        choice1: "font-style",
        choice2: "font-size",
        choice3: "text-style",
        choice4: "font-weight",
        answer: 2,
    },
    {
        question: "Which of the following HTML elements can have an 'href' attribute?",
        choice1: "<link>",
        choice2: "<a>",
        choice3: "<img>",
        choice4: "<button>",
        answer: 2,
    },
    {
        question: "What is the default value of the position property in CSS?",
        choice1: "relative",
        choice2: "fixed",
        choice3: "static",
        choice4: "absolute",
        answer: 3,
    },
    {
        question: "Which property is used to change the font of an element in CSS?",
        choice1: "font-family",
        choice2: "font-style",
        choice3: "font-weight",
        choice4: "font-size",
        answer: 1,
    },
    {
        question: "How do you create a new line in HTML?",
        choice1: "<br>",
        choice2: "<newline>",
        choice3: "<p>",
        choice4: "<break>",
        answer: 1,
    },
    {
        question: "Which of these attributes is used to specify the image source in HTML?",
        choice1: "src",
        choice2: "href",
        choice3: "alt",
        choice4: "image",
        answer: 1,
    },
    {
        question: "Which of the following is the correct way to call a function in JavaScript?",
        choice1: "callFunction()",
        choice2: "function call()",
        choice3: "function()",
        choice4: "call()",
        answer: 1,
    },
    // Add 30 more questions here following the same structure...
];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 50; // Update to 50 questions

// Start the quiz
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

// Get a new question
const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("./end.html"); // Redirect to end page
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    questionEl.innerText = currentQuestion.question;

    choiceContainers.forEach(choice => {
        const number = choice.dataset.number;
        const choiceText = choice.querySelector('.choice-text');
        choiceText.innerText = currentQuestion[`choice${number}`];
    });

    // Remove the used question from the array
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// Handle choice selection
choiceContainers.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target.closest('.choice-container');
        const selectedAnswer = selectedChoice.dataset.number;

        if (parseInt(selectedAnswer) === currentQuestion.answer) {
            score += CORRECT_BONUS;
        }

        scoreEl.innerText = `Score: ${score}`;

        setTimeout(() => {
            getNewQuestion();
        }, 1000); // 1 second delay before loading the next question
    });
});

// Initialize the game
startGame();
