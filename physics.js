var vel = 0;
var accel = 2*Math.PI/180;
var maxVel = 50*Math.PI/180;

function updatePhysics(output){
	vel = accel*output+vel*0.935;
	//vel = accel*output;
	//vel = Math.min(maxVel, vel);
	//vel = Math.max(-maxVel, vel);
	angle += vel;
}