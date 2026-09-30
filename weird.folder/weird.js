/// Site Thingies

let intervalIdFlashText;
let theming;
const titleText = document.getElementById("title");
const settingsTable = document.getElementById("settings");
const settingsButton = document.getElementById("settings_button");


function toggle_settings() {
	if(settingsTable.style.display == "none") {
		settingsTable.style.display = "block";
		settingsButton.innerHTML = "Hide Settings Menu";
	}
	else {
		settingsTable.style.display = "none";
		settingsButton.innerHTML = "Show Settings Menu";
	}
}

function jolly_text() {
	theming = 1;
	intervalIdFlashText ??= setInterval(flash_text, 1000);
}

function flash_text() {
	titleText.className = titleText.className === "jolly_green" ? "jolly_red" : "jolly_green";
}

function normal_text() {
	theming = 0;
	clearInterval(intervalIdFlashText);
	titleText.className = "normal_text";
}
/// Clicker Functions

let intervalIdPassive;
let clickerMsPassiveIncome;
let clickerMsPassiveIncomeCost;
let clickerCurrentScore;
let clickerScoreMultiplier1;
let clickerScoreMultiplierCost;

function passive_income_change() {
	
	if(clickerMsPassiveIncome == 1) {
		window.alert("You have somehow managed to upgrade this as much as you could... Good job?");
		return;
	}
	else if(clickerCurrentScore < clickerMsPassiveIncomeCost) {
		window.alert("You do not have enough score!");
		return;
	}
	if(clickerMsPassiveIncome == 0 )
		clickerMsPassiveIncome = 1000;
	else if(clickerMsPassiveIncome>1)
		clickerMsPassiveIncome--;
	clickerCurrentScore = clickerCurrentScore - clickerMsPassiveIncomeCost;
	clickerMsPassiveIncomeCost *= 10;
	passive_income_start();
	score_change(0);
	document.getElementById("passive_income").innerHTML = "Passive Income every " + clickerMsPassiveIncome + " ms";
	document.getElementById("passive_button").innerHTML = "Faster Passive Income ( Cost: " + clickerMsPassiveIncomeCost + " ) ";
	if(clickerMsPassiveIncome==1) {
		document.getElementById("passive_income").innerHTML = "1 Score / ms";
		document.getElementById("passive_button").innerHTML = "Faster Passive Income ( MAX ) ";
	}
}

function passive_income_start() {
	clearInterval(intervalIdPassive);
	intervalIdPassive = setInterval(passive_income, clickerMsPassiveIncome);
}

function passive_income() {
	score_change(clickerScoreMultiplier);
}

function click_add() {
	score_change(clickerScoreMultiplier);
}
function score_change(i) {
	clickerCurrentScore = clickerCurrentScore + i;
	document.getElementById("score").innerHTML = "Score: " + clickerCurrentScore;
}

function multiplier_change() {
	if(clickerCurrentScore < clickerScoreMultiplierCost ) {
		window.alert("You do not have enough score!");
		return;
	}
	clickerScoreMultiplier ++;
	clickerCurrentScore -= clickerScoreMultiplierCost;
	clickerScoreMultiplierCost *= 5;
	document.getElementById("score").innerHTML = "Score: " + clickerCurrentScore;
	document.getElementById("multiplier_button").innerHTML = "Add +1 to the Multiplier ( Cost: " + clickerScoreMultiplierCost + " )";
	document.getElementById("multiplier").innerHTML = "Click Multiplier: " + clickerScoreMultiplier;
}


/// Jumping Game




/// Website Things

function save() {
	localStorage.clickerCurrentScore = clickerCurrentScore;
	localStorage.clickerScoreMultiplier = clickerScoreMultiplier;
	localStorage.clickerScoreMultiplierCost = clickerScoreMultiplierCost;
	localStorage.clickerMsPassiveIncome = clickerMsPassiveIncome;
	localStorage.clickerMsPassiveIncomeCost = clickerMsPassiveIncomeCost;
	localStorage.theming = theming;
}

function wipe_save_data() {
	if(!window.confirm("Are you sure you wish to delete all save data?"))
		return;
	localStorage.clickerCurrentScore = null;
	localStorage.clickerScoreMultiplier = null;
	localStorage.clickerScoreMultiplierCost = null;
	localStorage.clickerMsPassiveIncome = null;
	localStorage.clickerMsPassiveIncomeCost = null;
	localStorage.theming = null;
	window.location.reload();
}

function load() {
	clickerCurrentScore = parseInt(localStorage.clickerCurrentScore);
	if(!Number.isInteger(clickerCurrentScore))
		clickerCurrentScore = 0;
	
	clickerScoreMultiplier = parseInt(localStorage.clickerScoreMultiplier);
	if(!Number.isInteger(clickerScoreMultiplier))
		clickerScoreMultiplier = 1;
	
	clickerScoreMultiplierCost = parseInt(localStorage.clickerScoreMultiplierCost);
	if(!Number.isInteger(clickerScoreMultiplierCost))
		clickerScoreMultiplierCost = 10;
	
	clickerMsPassiveIncome = parseInt(localStorage.clickerMsPassiveIncome);
	if(!Number.isInteger(clickerMsPassiveIncome))
		clickerMsPassiveIncome = 0;
	
	clickerMsPassiveIncomeCost = parseInt(localStorage.clickerMsPassiveIncomeCost);
	if(!Number.isInteger(clickerMsPassiveIncomeCost))
		clickerMsPassiveIncomeCost = 10;
	
	theming = parseInt(localStorage.theming);
	if(!Number.isInteger(theming))
		theming = 0;
	
	
	if(clickerMsPassiveIncome > 0 ) {
		passive_income_start();
		document.getElementById("passive_income").innerHTML = "Passive Income every " + clickerMsPassiveIncome + " ms";
		document.getElementById("passive_button").innerHTML = "Faster Passive Income ( Cost: " + clickerMsPassiveIncomeCost + " ) ";
	}
	
	
	/// Changing the Theme of The website
	
	if(theming==0) { }
	else if(theming==1) { jolly_text(); }
	
	
	document.getElementById("score").innerHTML = "Score: " + clickerCurrentScore;
	document.getElementById("multiplier_button").innerHTML = "Add +1 to the Multiplier ( Cost: " + clickerScoreMultiplierCost + " )";
	document.getElementById("multiplier").innerHTML = "Click Multiplier: " + clickerScoreMultiplier;
}

//Instructions for Start of the Website
toggle_settings();
load();
