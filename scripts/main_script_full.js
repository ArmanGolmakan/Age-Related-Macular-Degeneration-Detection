var canvW = window.innerWidth;
var canvH = window.innerHeight;
var animationID = 0; //used for cancelAnimationFrame
var mainRadX = 0; //HORIZONTAL RADIUS OF GROWING OVAL
var mainRadY = 0; //HORIZONTAL RADIUS OF GROWING OVAL
var targetRad = 150; //RADIUS OF TARGET CIRCLE
var targetPosX = canvW/2 +400;
var targetPosY = canvH/2 - 203;
var targetDistance; //DISTANCE FROM CENTER OF MAIN OVAL TO CENTER OF TARGET CIRCLE
var ovalCount = 1; //NUMBER OF OVALS DRAWN ON SCREEN SO FAR
var centerCircleRad = 10;
var cellLength = Math.floor(canvH/10);
var GridHorizontalOffset = (canvW - (16*cellLength))/2;//distance from the left side of monitor till first  grid.
var GridVerticalOffset = (canvH - (8*cellLength))/2;//distance from the top side of monitor till first  grid.



var radiusStartPeriod = [canvW/2 - (cellLength*1)];
var radiusEndPeriod = [canvW/2 - (cellLength*3)]


var xRadStart = [0,0,0,0, 
				cellLength, cellLength, cellLength, cellLength];
var xRadEnd = [cellLength,cellLength,cellLength,cellLength,
				 cellLength*2, cellLength*2, cellLength*2, cellLength*2];
var startAngle = [0, -90, -180, -260,
				 0];
var endAngle = [260, 180, 90, 0,
				260+45];
var mapList = ["D9", "D8", "E8", "E9",
				"D10"];


function patientClicked() {
	console.log('asssaaa');
}

function playAudio() {
	var x = document.getElementById("myAudio");
	x.play();
}

function getAngle() {
	var targetX = targetPosX - (canvW/2);
	var targetY = targetPosY - (canvH/2);
	return Math.atan2(targetY, targetX) * (180/Math.PI);
}

function init() {
  document.getElementById("button1").style.display="none";
  document.getElementById("gameCanvas").style.display="block";
  requestAnimationFrame(drawInit);
}

function drawInit() {
	var ctx = document.getElementById("gameCanvas").getContext("2d");
	ctx.clearRect(0, 0, canvW, canvH);
	ctx.canvas.width = canvW;
    ctx.canvas.height = canvH;
    drawOval();
    drawGrid();
    var animationID = requestAnimationFrame(drawInit);
}

var gridNums = 1;
function drawGrid() {
  	var ctx = document.getElementById("gameCanvas").getContext("2d");

  	// //DRAW CENTER CIRCLE
  	// ctx.beginPath();
  	// ctx.arc(canvW/2, canvH/2, centerCircleRad, 0, 2 * Math.PI);
  	// ctx.fillStyle="red";
  	// ctx.fill();


  	var img = document.getElementById("doctor");
  	ctx.drawImage(img, canvW/2 - cellLength/3, canvH/2 - cellLength/3, cellLength/1.5, cellLength/2);
	
}

function drawOval() {
	var ctx = document.getElementById("gameCanvas").getContext("2d");
	ctx.beginPath();
	if (mainRadX >= xRadStart[ovalCount-1] && mainRadX <= xRadEnd[ovalCount-1]) {
		ctx.ellipse(canvW/2, canvH/2, mainRadX, mainRadY, 0 * Math.PI/180, startAngle[ovalCount-1] * Math.PI/180, endAngle[ovalCount-1] * Math.PI/180);
	}
	else {
		ctx.ellipse(canvW/2, canvH/2, mainRadX, mainRadY, 0 * Math.PI/180, 0 * Math.PI/180, 360 * Math.PI/180);
	}
	ctx.stroke();
	mainRadX+=8/4;//horizontal radius growth rate (must be multiple of mainRadY)
	mainRadY+=4/4; //vertical radius growth rate

	if (mainRadX >= (canvW/2)-GridHorizontalOffset) { //if Oval is big enough, remove and draw next
		mainRadX = 0;
		mainRadY = 0;
		ovalCount++;
	}

	if (ovalCount == 80) { //end game
		console.log("GAME ENDED");
		document.write("GAME ENDED");
	}

}