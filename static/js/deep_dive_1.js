/*
 * ScatterPlot - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data			    -- the data
 */

 ScatterPlot = function(_parentElement, _data){
	this.parentElement = _parentElement;
	this.data = _data;
	this.displayData = []; // see data wrangling

	// DEBUG RAW DATA
	console.log(this.data);
	this.initVis();
}

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

ScatterPlot.prototype.initVis = function(){ 
	var vis = this;

	vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

	vis.width = 800 - vis.margin.left - vis.margin.right,
	vis.height = 400 - vis.margin.top - vis.margin.bottom;

	// SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
		.attr("width", vis.width + vis.margin.left + vis.margin.right)
		.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


	vis.radius = d3.scaleSqrt().range([2, 5]);

	vis.xScale = d3.scaleLinear()
	  .domain(d3.extent(vis.data, function(d) { return d.ffrpth14; }))
	  .range([0, vis.width]);


	vis.yScale = d3.scaleLinear()
	  .range([vis.height, 0])
	  .domain(d3.extent(vis.data, function(d) { return d.pct_obese_adults13; }));


	vis.xAxis = d3.axisBottom()
  		.scale(xScale);

  	vis.yAxis = d3.axisLeft()
  		.scale(yScale);

  	vis.radius.domain(d3.extent(vis.data, function(d){ return d.age; })).nice();

  	vis.g.append("g")
	  .attr("transform", "translate(0, "+vis.height+")")
	  .call(vis.xAxis);

	vis.g.append("g")
	  .call(vis.yAxis);

	vis.tooltip = vis.svg.append("g")
		.append("text")
		.attr("x", 10)
		.attr("y", 10)
		.text("");

	vis.wrangleData();

}

/*
 * Data wrangling
 */

ScatterPlot.prototype.wrangleData = function(){
	var vis = this;

	//vis.stackedData = vis.stack(vis.transposedData);

	// In the first step no data wrangling/filtering needed
	//vis.displayData = vis.stackedData;
	vis.updateVis();
}

ScatterPlot.prototype.updateVis = function(){
	var vis = this;

	var bubble = vis.g.selectAll("circle")
	.data(vis.data)
	.enter()
	.append("circle")
	.attr("cx", function(d) { return xScale(d.ffrpth14); })
	.attr("cy", function(d) { return yScale(d.pct_obese_adults13); })
	.attr("r", function(d) { return radius(d.pct_laccess_pop15); })
	.style("fill", "steelblue")
	.on("mouseover", function(d) {
		vis.tooltip.text(d.name);
	});


	bubble.exit().remove();

}

/*
d3.csv("data/combined.csv", function (data) {
  data.shift(); // Remove first element with headers
  // Process data here
});*/