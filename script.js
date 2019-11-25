console.log("Hello world!")

var c,g,width,height,x,y,length;
var tipX = 0;
var tipY = 0;
var angle = 0;
var mass = 10;
var angle = 0;
var lastAngle = 0;
var count = 0;
var target = 0;

kP=0;
kI=0;
kD=0;

function init(){
	console.log("init");
	c = document.getElementById("canvas");
	g = c.getContext("2d");
	width = c.width;
	height = c.height;
	x = width/3;
	y = 7*height/8;
	length = width/2;
	setPID();
	setTime()
}

window.addEventListener("load", init);

function setPID(){
	kP = document.getElementById("kP").value/4;
	kI = document.getElementById("kI").value;
	kD = document.getElementById("kD").value;
	controller.setTunings(kP,kI,kD);
}

function draw(){
	//Get positions
	tipX = x+Math.cos(-angle)*length;
	tipY = y+Math.sin(-angle)*length;
	
	//Clear screen
	g.clearRect(0,0,width,height);
	
	//Draw arm
	g.beginPath();
	g.moveTo(x, y);
	g.lineTo(tipX, tipY);
	g.lineWidth=15;
	g.stroke();
	g.closePath();
	
	//Draw motor
	g.beginPath();
	g.arc(x, y, 40, 0, 2 * Math.PI);
	g.fillStyle="grey";
	g.fill();
	g.closePath();
	
	//Draw load
	g.beginPath();
	g.arc(tipX, tipY, mass*2, 0, 2 * Math.PI);
	g.fillStyle="green";
	g.fill();
	g.closePath();
			
}
var controller = new PID(1,0,0);
controller.setSampleTime(50);
controller.setOutputLimits(-1,1);

function update(){
	setHist(document.getElementById("history").value);
	lastAngle = angle;
	
	console.log("PID:"+controller.p+"\t"+controller.i+"\t"+controller.d);
	//let output = 50/kP*(target-angle)
	//if(output > 1) output = 1;
	//if(output < -1) output = -1;
	
	output = controller.compute(angle);
	
	updatePhysics(output);
	//if(angle < target) angle += 0.01;
	//if(angle > target) angle -= 0.01;
	console.log(target+"\t"+angle);
	if(Math.abs(angle-lastAngle)>0.0001){
	//mass = document.getElementById("mass").value;
		plot(angle*(180/Math.PI), (target-angle)*(180/Math.PI), output, vel, count);
		count++;
	}
	
	//Redraw
	draw();
}

var updateLoop = setInterval(update, 50);

function setTarget(){
	target = document.getElementById("target").value * (Math.PI/180);
	controller.target = target;
}

function setTime(){
	let t = 500-(document.getElementById("time").value*50)+10;
	//console.log(document.getElementById("time").value*50);
	console.log(t);
	controller.setSampleTime(t);
	clearInterval(updateLoop);
	updateLoop=setInterval(update, t);
}
function pause(){
}
function play(){
}

function rst(){
	angle = 0;
	target = 0;
	controller.setTarget(0);
	vel = 0;
	clearPlot();
}