let intervalIdTextAnimation;

let frame=0;

function waitForTextAnimationEnd() {
	frame++;
	if(frame==240)
		document.getElementById("title").style.background = 'none';

}

intervalIdAnimation = setInterval(waitForTextAnimationEnd, 1);