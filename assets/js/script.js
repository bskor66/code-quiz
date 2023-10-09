//Start Game Elements
let startGameButton = document.getElementById("start-game-button");
let startGameSection = document.getElementById("start-game-section");

//Question Screen Elements
let questionSection = document.getElementById("question-section");

//Begin Game
function beginGame() {
	startGameSection.style.display = "none";
	questionSection.style.display = "flex";
}

//Start Game Button on Click
startGameButton.addEventListener("click", beginGame);
