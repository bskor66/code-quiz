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

//Header Elements
let timeCounter = document.getElementById("timer");

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
		question: "What is the capital of France?",
		choices: ["London", "Berlin", "Paris", "Madrid"],
		correctAnswer: "Paris",
	},
	{
		...questionTemplate,
		question: "Which planet is known as the Red Planet?",
		choices: ["Mars", "Venus", "Jupiter", "Earth"],
		correctAnswer: "Mars",
	},
	{
		...questionTemplate,
		question: "Which planet is known as the Red Planet?",
		choices: ["Mars", "Venus", "Jupiter", "Earth"],
		correctAnswer: "Mars",
	},
];

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
	endGameScore.textContent = `Your final score is ${timeLeft}`;
	clearInterval(timer);
	console.log("end");
}

//on load
function init() {
	startGameButton.addEventListener("click", beginGame);
	setTimeCounter(timeLeft);
}

init();
