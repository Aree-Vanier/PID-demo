console.log("Hello world!")

var p, o, pg, og, posChart, outChart;

var interval = [];
var hist = 250;


var posData = {
	labels: interval,
	datasets:[{
		label: "Position",
		data: [],
		fill:false,
		borderColor:"#000000",
		pointRadius:0,
		yAxisID:"A"
	}, 	
	{
		label: "Error",
		data: [],
		fill:false,
		borderColor:"#FF0000",
		pointRadius:0,
		yAxisID:"B"
	}]
};
var outData = {
	labels: interval,
	datasets:[{
		label: "Output %",
		data: [],
		fill:false,
		borderColor:"#000000",
		pointRadius:0
	}, 
	{
		label: "Speed (rad/s)",
		data: [],
		fill:false,
		borderColor:"#FF0000",
		pointRadius:0
	}]
};

var posChartOpts = {
	animation:false,
	scales: {
		yAxes: [{
			id:"A",
			position:"right",
			ticks: {
				beginAtZero: true,
				suggestedMax:135,
				suggestedMin:-20
			}
		},
		{
			id:"B",
			position:"left",
			ticks: {
				beginAtZero: true,
				suggestedMax:80,
				suggestedMin:-80
			}
		}],
		xAxes: [{
		//	display:false
		}]
	}
}

var outChartOpts = {
	animation:false,
	scales: {
		yAxes: [{
			ticks: {
				beginAtZero: true,
				max:1.0,
				min:-1.0
			}
		}],
		xAxes: [{
		//	display:false
		}]
	}
}

function init(){
	console.log("init")
	p = document.getElementById("position");
	pg = p.getContext("2d");
	posChart = new Chart(pg, {
		type:"line",
		data:posData,
		options: posChartOpts
	});
	
	o = document.getElementById("output");
	og = o.getContext("2d");
	outChart = new Chart(og, {
		type:"line",
		data:outData,
		options: outChartOpts
	});
}

window.addEventListener("load", init);


function plot(pos, err, output, speed, idx){
	interval.push(idx);
	//posChart.options.scales.xAxes[0].ticks.min = idx-history;
	//outChart.options.scales.xAxes[0].ticks.min = idx-history;
	posData.datasets[0].data.push(pos);
	posData.datasets[1].data.push(err);
	outData.datasets[0].data.push(output);
	outData.datasets[1].data.push(speed);
	posChart.update();
	outChart.update();
}

function setHist(h){
	hist = h;
	posChart.options.scales.xAxes[0].ticks.min = interval.length-hist;
	outChart.options.scales.xAxes[0].ticks.min = interval.length-hist;
	posChart.update();
	outChart.update();
}

function clearPlot(){
	console.log("Clearing");
	interval = [];
	//posChart.options.scales.xAxes[0].ticks.min = idx-history;
	//outChart.options.scales.xAxes[0].ticks.min = idx-history;
	posData.datasets[0].data = [];
	posData.datasets[1].data = [];
	outData.datasets[0].data = [];
	outData.datasets[1].data = [];
	posChart.update();
	outChart.update();
}