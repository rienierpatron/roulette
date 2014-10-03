var score = 0;
var needed = 10
var life = 3;
var winCount = 1;
var loseCount = 13;
var totalCount = winCount+loseCount;
var colors = new Array;
var results = new Array;
var counterColor = 0;
var counterWin = 0;
var counterLose = 0;
var $lastInput = "";

for(var count = 0; count < totalCount; count++){
	if(count == 10 || count == 3){
		results.push("WIN");
		counterWin = counterWin+1;
	}else{
		results.push("LOSE");
		counterLose = counterLose+1;
	}
}

var startAngle = 0;
var size = totalCount;
var sizeOver2 = size/2;
var arc = Math.PI / sizeOver2; //divides the circle
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
	var spinTimeTotal = 0;

var canvas = document.getElementById("wheelcanvas");
canvas.width = 500;
canvas.height = 500;

var base = 500;
	var baseOver2 = base/2;
	var gameFont = 'bold 30px sans-serif';


var ctx;
	function resizing(wi){
		if(wi >= 478 && wi <=480){
		$("canvas").css("margin-left",80+"px");
	}
	if(wi >= 481 && wi <=599){
		$("canvas").css("margin-left",20+"px");
	}
	if(wi >= 600 && wi <= 613){
		$("canvas").css("margin-left",85+"px");
	}
	if(wi >= 700 && wi <= 781){
		$("canvas").css("margin-left",20+"px");
	}
	if(wi >= 1024){
		$("canvas").css("margin-left",50+"px");
	}
	}
function draw() {
	drawRouletteWheel();
}

function drawRouletteWheel() {
	var canvas = document.getElementById("wheelcanvas");
	if (canvas.getContext) {
		var outsideRadius = baseOver2-5; //size per cut - original 190
		var textRadius = baseOver2-40; //text position - original 150
		var insideRadius = baseOver2-250; //inside circle - original 105

		ctx = canvas.getContext("2d");
		ctx.clearRect(0,0,base,base);
		ctx.strokeStyle = "#FFFFFF"; //stroke color
		ctx.lineWidth = 20;

		

		for(var i = 0; i < size; i++) { // < n in loop show the number of divisions
			var angle = startAngle + i * arc;
			var text = results[i];
			if(text == "WIN"){
				ctx.font = 'bold 20px sans-serif';
				ctx.fillStyle = "#EB3F3C";
			}else{
				ctx.font = 'bold 10px sans-serif';
				ctx.fillStyle = "#40474D";
			}
			ctx.beginPath();
			ctx.arc(baseOver2, baseOver2, outsideRadius, angle, angle + arc, false); //pathing outside
			ctx.arc(baseOver2, baseOver2, insideRadius, angle + arc, angle, true); //pathing inside
			if(i != size-1){
				if(i == 0){
					ctx.lineWidth = 1;
					ctx.stroke();
				}else{
					ctx.stroke();
				}
				
			}else{
				ctx.lineWidth = 1;
				ctx.stroke();
			}
			ctx.fill();
			ctx.save();
			ctx.shadowOffsetX = -1;
			ctx.shadowOffsetY = -1;
			ctx.shadowBlur    = 0;
			ctx.fillStyle = "#FFFFFF";
			ctx.translate(baseOver2 + Math.cos(angle + arc / 2) * textRadius, baseOver2 + Math.sin(angle + arc / 2) * textRadius);
			ctx.rotate(angle + arc / 2 + Math.PI / 2);
			ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			ctx.restore();
		}
		//Arrow
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.moveTo(baseOver2 - 4, baseOver2 - (outsideRadius + 5));

		ctx.lineTo(baseOver2 + 7, baseOver2 - (outsideRadius + 5));
		ctx.lineTo(baseOver2 + 7, baseOver2 - (outsideRadius - 5));
		ctx.lineTo(baseOver2 + 12, baseOver2 - (outsideRadius - 5));
		ctx.lineTo(baseOver2 + 0, baseOver2 - (outsideRadius - 13));
		ctx.lineTo(baseOver2 - 12, baseOver2 - (outsideRadius - 5));
		ctx.lineTo(baseOver2 - 7, baseOver2 - (outsideRadius - 5));
		ctx.lineTo(baseOver2 - 7, baseOver2 - (outsideRadius + 5));
		ctx.fill();
	}
}

function spin() {
	spinAngleStart = Math.random() * 10 + 10;
	spinTime = 0;
	spinTimeTotal = Math.random() * 3 + 3 * 1000;
	rotateWheel();
}

function rotateWheel() {
	$('#spinner').hide();
	$('#wait').show();
	var set = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
	var digit = Math.floor((Math.random() * set) + 1);
	var time = Math.floor((Math.random() * digit) + 1);
	console.log(time);
	spinTime += time;
	if(spinTime >= spinTimeTotal) {
		stopRotateWheel();
		return;
	}
	var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	startAngle += (spinAngle * Math.PI / 180);
	drawRouletteWheel();
	spinTimeout = setTimeout('rotateWheel()', 10);
}

function stopRotateWheel() {
	$('#spinner').show();
	$('#wait').hide();
	clearTimeout(spinTimeout);
	var degrees = startAngle * 180 / Math.PI + 90;
	var arcd = arc * 180 / Math.PI;
	var index = Math.floor((360 - degrees % 360) / arcd);
	ctx.save();
	ctx.font = gameFont;
	var text = results[index]
	if(text == "WIN"){
		ctx.fillStyle = "green";
		$('html, body').animate({
	        scrollTop: $("#elementtoScrollToID").offset().top
	    }, 1000);
	    $('#slotMachineButtonShuffle').show();
	    $('#slotMachineButtonStop').hide();
		$('#slotMachineButtonWaiting').hide();
		$('#slotMachineMessage').hide();
		$('#slotMachineButtonAgain').hide();
	}else{
		ctx.fillStyle = "red";
		life = life-1;
		$('.life').text(life);
		if(life == 0){
			$('#spinner').hide();
			$('#reset').show();
		}
	}
	ctx.restore();
}

function easeOut(t, b, c, d) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc + -3*ts + 3*t);
}