//Start Game Elements
let startGameButton = document.getElementById("start-game-button");
let startGameSection = document.getElementById("start-game-section");

//Question Screen Elements
let questionSection = document.getElementById("question-section");
let questionHeader = questionSection.querySelector("h2");
let choicesOL = questionSection.querySelector("ol");
let answerResult = questionSection.querySelector("h4");

//End Game Elements
let endGameSection = document.getElementById("end-game-section");
let endGameScore = document.getElementById("final-score");
let initialInput = document.getElementById("initials");
let enterInitialForm = endGameSection.querySelector("form");

//Header Elements
let timeCounter = document.getElementById("timer");
let viewScores = document.getElementById("view-scores");

//High Scores Elements
let highScoresSection = document.getElementById("high-scores-section");
let highScoresList = highScoresSection.querySelector("ol");
let clearScoresButton = document.getElementById("clear-scores");
let backToHomeButton = document.getElementById("back-to-home");

//Questions
const questionTemplate = {
	question: "",
	choices: [],
	correctAnswer: "",
};

const questions = [
	{
		//inherit template structure
		...questionTemplate,
		question: "What does HTML stand for in web development?",
		choices: [
			"Hypertext Markup Language",
			"Hyper Transfer Markup Language",
			"Highly Textured Machine Learning",
			"Hyperspace Time Manipulation Language",
		],
		correctAnswer: "Hypertext Markup Language",
	},
	{
		...questionTemplate,
		question: "Which language is used for styling web pages?",
		choices: ["JavaScript", "Python", "CSS", "HTML", "Ruby"],
		correctAnswer: "CSS",
	},
	{
		...questionTemplate,
		question: "What is the correct way to comment in HTML?",
		choices: [
			"// This is a comment",
			"<!-- This is a comment -->",
			"/* This is a comment */",
			"# This is a comment",
		],
		correctAnswer: "<!-- This is a comment -->",
	},
	{
		...questionTemplate,
		question:
			"Which of the following tags is used to create a hyperlink in HTML?",
		choices: ["<a>", "<h1>", "<div>"],
		correctAnswer: "<a>",
	},
	{
		...questionTemplate,
		question:
			"What is the purpose of the 'document.getElementById' method in JavaScript?",
		choices: [
			"To add a new HTML element",
			"To retrieve a specific HTML element by its ID",
			"To create a new HTML document",
			"To delete an HTML element",
		],
		correctAnswer: "To retrieve a specific HTML element by its ID",
	},
];

// Add more questions as needed

var timeLeft = 60;
var questionI = 0;

function clearQuestion() {
	questionHeader.innerHTML = "";
	choicesOL.innerHTML = "";
}

//Display question
function displayQuestion(question) {
	questionHeader.innerText = question.question;
	question.choices.forEach((element) => {
		let choiceLi = document.createElement("li");
		let choiceButton = document.createElement("button");
		choiceButton.innerText = element;
		choiceButton.addEventListener("click", () => {
			if (question.correctAnswer === element) {
				answerResult.textContent = "Correct!";
			} else {
				answerResult.textContent = "Wrong!";
				timeLeft -= 10;
				setTimeCounter(timeLeft);
			}
			questionI++;
			clearQuestion();
			if (questionI >= questions.length) {
				endGame();
			} else {
				displayQuestion(questions[questionI]);
			}
		});
		choiceLi.appendChild(choiceButton);
		choicesOL.appendChild(choiceLi);
	});
}

function setTimeCounter(num) {
	timeCounter.textContent = `Time Left: ${num}`;
}

//Begin Game
function beginGame() {
	startGameSection.style.display = "none";
	questionSection.style.display = "flex";

	window.timer = setInterval(() => {
		timeLeft--;
		setTimeCounter(timeLeft);
		if (timeLeft <= 0) {
			endGame();
		}
	}, 1000);

	displayQuestion(questions[questionI]);
}

function endGame() {
	questionSection.style.display = "none";
	endGameSection.style.display = "flex";
	endGameScore.textContent = `Your final score is ${timeLeft}.`;
	clearInterval(timer);
	console.log("end");
}

function enterInitials(event) {
	event.preventDefault();
	let scoreBoard = JSON.parse(localStorage.getItem("scores"));
	if (!scoreBoard) {
		scoreBoard = {};
	}
	scoreBoard[initialInput.value] = timeLeft;
	localStorage.setItem("scores", JSON.stringify(scoreBoard));
	endGameSection.style.display = "none";
	displayScores();
}

function displayScores() {
	highScoresSection.style.display = "flex";
	let scoreBoard = JSON.parse(localStorage.getItem("scores"));
	highScoresList.innerHTML = "";
	Object.keys(scoreBoard).forEach((name) => {
		let scoreLi = document.createElement("li");
		scoreLi.textContent = `${name} - ${scoreBoard[name]}`;
		highScoresList.appendChild(scoreLi);
	});
}

//on load
function init() {
	startGameButton.addEventListener("click", beginGame);
	enterInitialForm.addEventListener("submit", enterInitials);
	clearScoresButton.addEventListener("click", () => {
		localStorage.removeItem("scores");
		displayScores();
	});
	setTimeCounter(timeLeft);
	viewScores.addEventListener("click", () => {
		endGame();
		startGameSection.style.display = "none";
		endGameSection.style.display = "none";
		displayScores();
	});
	backToHomeButton.addEventListener("click", () => {
		location.reload();
	});
}

init();
