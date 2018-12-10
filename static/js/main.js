var allData = [];

var us_map, deep_dive_1, deep_dive_2, deep_dive_3;

loadData();

function loadData() {

	// ******this data should be looked at, I think it needs to have null values dropped
	// and metro should be a boolean
	d3.csv("data/combined.csv", function (data) {
	  data.shift(); // Remove first element with headers
	  // Process data here


	  allData = data;
	  createVis();
	});

}

function createVis() {
	console.log(allData);
	deep_dive_1 = new ScatterPlot("deep_dive_1_svg", allData);
}