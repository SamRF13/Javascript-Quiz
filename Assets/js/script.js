const startButton = document.getElementById("start-btn")
const questionContainerElement = document.getElementById("question-container")
const answerButtons = document.getElementById("answer-buttons")
const highScoreContainer = document.getElementById("container-highscore");
const pElement = document.getElementById('score-span');

var questionIndex = 0
var timeLimit = 60;
var intervalId;
var scoreCount = 0
var startagain = document.getElementById("startagain-btn")
var username

document.getElementById("score").innerHTML = scoreCount
document.getElementById("timer").innerHTML = timeLimit

function createEndQuizHtmlElements(info) 
    {
    var score = JSON.parse(localStorage.getItem("userInfo")) || [];

    let highScoreDiv = document.createElement('div');
    let startAgainBtn = document.createElement('button');
    highScoreDiv.textContent = 'highscore';
    highScoreDiv.classList.add('highscore');
    startAgainBtn.textContent = 'start again';
    startAgainBtn.classList.add('start-btn');
    startAgainBtn.addEventListener("click", startQuiz);
    highScoreContainer.replaceChildren();
    highScoreContainer.append(highScoreDiv, startAgainBtn) 
    for (var i = 0; i < score.length ; i++) {  
        let scoreLine = document.createElement('p');
        scoreLine.textContent = `${score[i].Name} scored ${score[i].score}.`;
        highScoreContainer.append(scoreLine);
    }
    }

function endQuiz() {
    clearInterval(intervalId);
    username = prompt("Game Over. Please enter your username:");

    //LOCAL STORAGE
    var score = JSON.parse(localStorage.getItem("userInfo")) || [];

    var userInfo = {
        Name: username,
        score: scoreCount
    };

    score.push(userInfo);

    localStorage.setItem("userInfo", JSON.stringify(score));

    // replace contents of highScoreContainer, passing in userInfo object
    createEndQuizHtmlElements(userInfo);

    //DISPLAY ALL HIGH SCORES FROM SCORE ARRAY

    //SHOWING AND NOT SHOWING ITEMS
    document.getElementById("container").classList.add("hide");
    highScoreContainer.classList.remove("hide");
    
    startButton.classList.remove("hide");
}


function startQuiz() {
    questionIndex = 0;
        timeLimit = 60;
    document.getElementById("container-highscore").classList.add("hide")
    document.getElementById("container").classList.remove("hide");
    shuffle(questions);
    startButton.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    showQuestion()
    intervalId = setInterval(function () {
        if (timeLimit < 0) {
            timeLimit = 0;
        } else {
            timeLimit = timeLimit - 1;
        }
        document.getElementById("timer").innerHTML = timeLimit;
        if (timeLimit == 0) {
            endQuiz()
        }
    }, 1000);
}

function showQuestion(question) {
    questionContainerElement.textContent = questions[questionIndex]['question'];
    answerButtons.innerHTML = ""
    questions[questionIndex].answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("btn")
        button.dataset.correct = answer.correct
        answerButtons.appendChild(button)
    })
}

function selectAnswer(event) {
    if (event.target.matches("button")) {
        if (event.target.dataset.correct == "true") {
            scoreCount++
            document.getElementById("score").innerHTML = scoreCount
        } else {
            timeLimit = timeLimit - 10;
        }
        questionIndex++;
        if (questionIndex >= questions.length) {
            endQuiz()
        } else {
            showQuestion()
        }
    }
}

function shuffle(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
}
const questions = [
    {
        question: "What is JavaScript?",
        answers: [
            { text: "The script wrote for Java the Hut in Star Wars (1983) Return of the Jedi.", correct: false },
            { text: "The name of the costume used when roleplaying Java the Hut", correct: false },
            { text: "A low level, static, and useless programming language", correct: false },
            { text: "A high-level, dynamic, and interpreted programming language.", correct: true },
        ]

    },
    {
        question: "What is the syntax for a basic JavaScript function?",
        answers: [
            { text: "computer please say (hello world).", correct: false },
            { text: "( function do) (say what computer should do)", correct: false },
            { text: "Extract (aJDOMoWAR---code)", correct: false },
            { text: "A function functionName(arguments) { statements; }", correct: true },
        ]

    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            { text: "The name of the variable will be (name)", correct: false },
            { text: "(this is a variable) (name of variable)", correct: false },
            { text: "variableName var", correct: false },
            { text: "var variableName;", correct: true },
        ]

    },
    {
        question: "What is the difference between var, let and const in JavaScript?",
        answers: [
            { text: "var is function scoped, let is block scoped and const is block scoped and cannot be reassigned.", correct: true },
            { text: "const is function scoped, let is block scoped, and var cannot be reassigned", correct: false },
            { text: "let is for MAC OS, Let is for Windows, and const is only used in Linux", correct: false },
            { text: "They are all the same and can be used interchangeably.", correct: false },
        ]
    },
    {
        question: "What is hoisting in JavaScript?",
        answers: [
            { text: "Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their scope.", correct: true },
            { text: "When you type it. All of your code moves to the line number one. ", correct: false },
            { text: "When you type it it removes all the empty lines in your code", correct: false },
            { text: "When you click a button with the attribute hoisting it takes you to the top of the page", correct: false },
        ]
    },
    {
        question: "What is closure in JavaScript?",
        answers: [
            { text: "Closure is a function inside another function that has access to the outer functions variables and retains access to them even after the outer function has returned.", correct: true },
            { text: "You type it at the end of the code so you know its the end", correct: false },
            { text: "As in storys, closure is a quick summary of your code thats written at the end.", correct: false },
            { text: "The costume of writting a famous quote at the end of your code/webpage", correct: false },
        ]
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        answers: [
            { text: "It is a typo, only == is valid.", correct: false },
            { text: "== performs type coercion before comparison and === does not perform type coercion and only compares values of the same type.", correct: true },
            { text: "It is the same, they can be used intercheable ", correct: false },
            { text: "== is used in Windows. While === is only used in Mac OS", correct: false },
        ]
    },
    {
        question: "What is an event in JavaScript?",
        answers: [
            { text: "It's the name of a scene in Star Wars. Where brave Leia strangles Java the Hut with her chains.", correct: false },
            { text: "It's an action that occurs in the browser, such as a user clicking a button.", correct: true },
            { text: "Tts the function that helps to schedule various events", correct: false },
            { text: "It's the action of saving the file", correct: false },
        ]
    },
    {
        question: "How do you add an element to an HTML document using JavaScript?",
        answers: [
            { text: "Typing ' please add element' to the terminal", correct: false },
            { text: "You can use the .innerHTML property or .createElement() method.", correct: true },
            { text: "By clicking alt+f4", correct: false },
            { text: "By clicking on file and then duplicate workspace", correct: false },
        ]
    },
    {
        question: "What is DOM in Javascript?",
        answers: [
            { text: "Death Observer Machine is a device which purpose is to count how many animals die per day in the farm.", correct: false },
            { text: "Delayed Oblique Soreness is the name of a muscle pain in that particular muscle, that happens at least a day after working out", correct: false },
            { text: "The Document Object Module is a hierarchical tree-like structure representing an HTML document and its elements.", correct: true },
            { text: "Dean Of Medicine is the tittle of the person that rules the hospital.", correct: false },
        ]
    },

    {
        question: "What is an AJAX request in JavaScript?",
        answers: [
            { text: "Ajax was a Greek mythological hero and commander", correct: false },
            { text: "Same as the household product, AJAX helps clean the code of any bugs", correct: false },
            { text: "AJAX is a technique for creating fast and dynamic web pages by updating the content without reloading the page.", correct: true },
            { text: "It is an abbreviation for displaying (hello, world)", correct: false },
        ]
    },

    {
        question: "How do you handle errors in JavaScript?",
        answers: [
            { text: "You don't. If you make a mistake, you have to delete everything and start a new code", correct: false },
            { text: "You blame your brother for messing with your computer, again.", correct: false },
            { text: "You can use try-catch statements or the .onerror event.", correct: true },
            { text: "You throw a tantrum and quit coding entirely.", correct: false },
        ]
    },

    {
        question: "What is the difference between null and undefined in JavaScript?",
        answers: [
            { text: "Null is explicitly set by the programmer, while undefined means a value has not been assigned to a variable.", correct: true },
            { text: "They are the same, can be used interchangeably.", correct: false },
            { text: "Null can only be used in Windows. While undefined is only used in Mac OS", correct: false },
            { text: "Undefined is explicitly set by the programmer, while Null means a value has not been assigned to a variable.", correct: false },
        ]
    },
]

startButton.addEventListener("click", startQuiz)
answerButtons.addEventListener("click", selectAnswer)
startagain.addEventListener("click", startQuiz);

