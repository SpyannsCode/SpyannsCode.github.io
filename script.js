let currentScore = 0;
let scoreMultiplier = 1;
let scoreMultiplierCost = 10;

function score_change() {
	currentScore = currentScore + scoreMultiplier;
	document.getElementById("score").innerHTML = "Score: " + currentScore;
}
function multiplier_change() {
	if(currentScore < scoreMultiplierCost ) {
		window.alert("You do not have enough score!");
		return;
	}
	scoreMultiplier ++;
	currentScore -= scoreMultiplierCost;
	scoreMultiplierCost *= 5;
	document.getElementById("score").innerHTML = "Score: " + currentScore;
	document.getElementById("multiplier_button").innerHTML = "Add +1 to the Multiplier ( Cost: " + scoreMultiplierCost + " )";
	document.getElementById("multiplier").innerHTML = "Multiplier: " + scoreMultiplier;
}
function save() {
	if(!window.confirm("Saving will erase your pevious save, are you sure you want to do this?"))
		return;
	localStorage.currentScore = currentScore;
	localStorage.scoreMultiplier = scoreMultiplier;
	localStorage.scoreMultiplierCost = scoreMultiplierCost;
}
function load() {
	if(!window.confirm("Loading will erase your current save, are you sure you want to do this?"))
		return;
	currentScore = parseInt(localStorage.currentScore);
	scoreMultiplier = parseInt(localStorage.scoreMultiplier);
	scoreMultiplierCost = parseInt(localStorage.scoreMultiplierCost);
	document.getElementById("score").innerHTML = "Score: " + currentScore;
	document.getElementById("multiplier_button").innerHTML = "Add +1 to the Multiplier ( Cost: " + scoreMultiplierCost + " )";
	document.getElementById("multiplier").innerHTML = "Multiplier: " + scoreMultiplier;
}
