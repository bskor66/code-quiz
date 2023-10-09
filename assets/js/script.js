//Start Game Elements
let startGameButton = document.getElementById("start-game-button");
let startGameSection = document.getElementById("start-game-section");

//Question Screen Elements
let questionSection = document.getElementById("question-section");
let questionHeader = questionSection.querySelector("h2");
let choicesOL = questionSection.querySelector("ol");

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
];

//Display question
function displayQuestion(question) {
	questionHeader.innerText = question.question;

	question.choices.forEach((element) => {
		let choiceLi = document.createElement("li");
		let choiceButton = document.createElement("button");
		choiceButton.innerText = element;
		choiceLi.appendChild(choiceButton);
		choicesOL.appendChild(choiceLi);
	});
}

//Begin Game
function beginGame() {
	startGameSection.style.display = "none";
	questionSection.style.display = "flex";

	displayQuestion(questions[0]);
}

//Start Game Button on Click
startGameButton.addEventListener("click", beginGame);
