let startGameButton = document.getElementById("start-game-button");
let startGameSection = document.getElementById("start-game-section");

function beginGame() {
	startGameSection.style.display = "none";
}

startGameButton.addEventListener("click", beginGame);
