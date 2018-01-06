var canvW = window.innerWidth;
var canvH = window.innerHeight;
var xSpeed = 14;
var ySpeed = 7;
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
				cellLength, cellLength*2.5, cellLength*2, cellLength*2,
				cellLength*2.5];
var xRadEnd = [cellLength,cellLength,cellLength,cellLength,
				 cellLength*2, cellLength*4, cellLength*4, cellLength*4,
				 cellLength*4];
var startAngle = [0, -90, -180, -260,
				 0, -60, -75, -92];
var endAngle = [260, 180, 90, 0,
				260+45, 290, 275, 255];
var mapList = ["D9", "D8", "E8", "E9",
				"D10", "C10", "C9", "C8",
				 "C7", "D7", "E7", "F7",
				  "F8", "F9", "F10", "E10"];

function patientClicked() {
	console.log('Click Registered!');
}

function playAudio() {
	var x = document.getElementById("myAudio");
	x.play();
}

function increaseSpeed() {
	xSpeed = xSpeed+6;
	ySpeed = xSpeed/2;
}

function decreaseSpeed() {
	xSpeed = xSpeed-6;
	ySpeed = xSpeed/2;
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
  	ctx.drawImage(img, canvW/2 - cellLength/3, canvH/2 - cellLength/3, cellLength/1.5, cellLength/1.5);


  	//DRAW GRIDS
  	ctx.setLineDash([5, 3]);
  	ctx.lineWidth=2.5;
  	ctx.beginPath();
	ctx.moveTo(canvW/2, 0);
	ctx.lineTo(canvW/2, canvH);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, canvH/2);
	ctx.lineTo(canvW, canvH/2);
	ctx.stroke();
	ctx.lineWidth=0.5;
	//VERTICAL, RIGHT SIDE
  	for (var i=1; i<9; i++) {
	  	ctx.beginPath();
		ctx.moveTo(canvW/2+(cellLength*i), GridVerticalOffset);
		ctx.lineTo(canvW/2+(cellLength*i), canvH - GridVerticalOffset);
		ctx.stroke();
  	}
  	//VERTICAL, LEFT SIDE
  	for (var i=1; i<9; i++) {
	  	ctx.beginPath();
		ctx.moveTo(canvW/2-(cellLength*i), GridVerticalOffset);
		ctx.lineTo(canvW/2-(cellLength*i), canvH - GridVerticalOffset);
		ctx.stroke();
  	}
  	//HORIZONTAL, TOP SIDE
  	for (var i=1; i<5; i++) {
	  	ctx.beginPath();
		ctx.moveTo(GridHorizontalOffset, canvH/2+(cellLength*i));
		ctx.lineTo(canvW - GridHorizontalOffset, canvH/2+(cellLength*i));
		ctx.stroke();
  	}
  	//HORIZONTAL, BOTTOM SIDE
  	for (var i=1; i<5; i++) {
	  	ctx.beginPath();
		ctx.moveTo(GridHorizontalOffset, canvH/2-(cellLength*i));
		ctx.lineTo(canvW - GridHorizontalOffset, canvH/2-(cellLength*i));
		ctx.stroke();
  	}
  	//GRID NUMBERING
  	
	ctx.font = "3vh Arial";
	//HORIZONTAL NUMBERS 1 to 16
	ctx.fillText(1 , GridHorizontalOffset + (cellLength/3) + (cellLength*0) , GridVerticalOffset/1 );
	ctx.fillText(2 ,GridHorizontalOffset + (cellLength/2) + (cellLength*1), GridVerticalOffset/1 );
	ctx.fillText(3 ,GridHorizontalOffset + (cellLength/2) + (cellLength*2), GridVerticalOffset/1 );
	ctx.fillText(4 ,GridHorizontalOffset + (cellLength/2) + (cellLength*3), GridVerticalOffset/1 );
	ctx.fillText(5 ,GridHorizontalOffset + (cellLength/2) + (cellLength*4), GridVerticalOffset/1 );
	ctx.fillText(6 ,GridHorizontalOffset + (cellLength/2) + (cellLength*5), GridVerticalOffset/1 );
	ctx.fillText(7 ,GridHorizontalOffset + (cellLength/2) + (cellLength*6), GridVerticalOffset/1 );
	ctx.fillText(8 ,GridHorizontalOffset + (cellLength/2) + (cellLength*7), GridVerticalOffset/1 );
	ctx.fillText(9 ,GridHorizontalOffset + (cellLength/2) + (cellLength*8), GridVerticalOffset/1 );
	ctx.fillText(10 ,GridHorizontalOffset + (cellLength/2) + (cellLength*9), GridVerticalOffset/1 );
	ctx.fillText(11 ,GridHorizontalOffset + (cellLength/2) + (cellLength*10), GridVerticalOffset/1 );
	ctx.fillText(12 ,GridHorizontalOffset + (cellLength/2) + (cellLength*11), GridVerticalOffset/1 );
	ctx.fillText(13 ,GridHorizontalOffset + (cellLength/2) + (cellLength*12), GridVerticalOffset/1 );
	ctx.fillText(14 ,GridHorizontalOffset + (cellLength/2) + (cellLength*13), GridVerticalOffset/1 );
	ctx.fillText(15 ,GridHorizontalOffset + (cellLength/2) + (cellLength*14), GridVerticalOffset/1 );
	ctx.fillText(16 ,GridHorizontalOffset + (cellLength/2) + (cellLength*15), GridVerticalOffset/1 );

	//VERTICAL LETTERS
	ctx.fillText("A" , canvW - (GridHorizontalOffset/1) , (GridVerticalOffset/2) + (cellLength * 1) );
	ctx.fillText("B" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 2) );
	ctx.fillText("C" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 3) );
	ctx.fillText("D" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 4) );
	ctx.fillText("E" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 5) );
	ctx.fillText("F" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 6) );
	ctx.fillText("G" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 7) );
	ctx.fillText("H" ,canvW - (GridHorizontalOffset/1), (GridVerticalOffset/2) + (cellLength * 8) );	
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
	mainRadX+=xSpeed/4;//horizontal radius growth rate - speed (must be multiple 2 of mainRadY)
	mainRadY+=ySpeed/4; //vertical radius growth rate - speed

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