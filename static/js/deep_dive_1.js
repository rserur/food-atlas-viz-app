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
	//console.log(this.data);
	this.initVis();
}

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

ScatterPlot.prototype.initVis = function(){
	var vis = this;

	vis.margin = { top: 20, right: 0, bottom: 40, left: 40 };

	vis.width = 365 - vis.margin.left - vis.margin.right,
	vis.height = 200 - vis.margin.top - vis.margin.bottom;

	// SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
		.attr("width", vis.width + vis.margin.left + vis.margin.right)
		.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


	vis.radius = d3.scaleSqrt().range([2, 5]);

	vis.xScale = d3.scaleLinear()
	  .domain(d3.extent(vis.data, function(d) { return d.fast_food; }))
	  .range([0, vis.width]);


	vis.yScale = d3.scaleLinear()
	  .range([vis.height, 0])
	  .domain(d3.extent(vis.data, function(d) { return d.obesity; }));


	vis.xAxis = d3.axisBottom()
  		.scale(vis.xScale);

  	vis.yAxis = d3.axisLeft()
  		.scale(vis.yScale);

  	vis.radius.domain(d3.extent(vis.data, function(d){ return d.low_access; })).nice();

  	// changed these both from "g" to "svg" for some reason
  	vis.svg.append("g")
	  .attr("transform", "translate(0, "+vis.height+")")
	  .call(vis.xAxis);

	vis.svg.append("g")
	  .call(vis.yAxis);

	vis.tooltip = vis.svg.append("g")
		.append("text")
		.attr("x", 10)
		.attr("y", 10)
		.text("");

	vis.svg.append('text')
    .attr("transform", "rotate(-90)")
    .attr('x', -90)
    .attr('y', -25)
    .attr('class', 'label')
    .text('Obesity Rate');

  	vis.svg.append('text')
    .attr('x', (vis.width/2))
    .attr('y', vis.height + 35)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .text('Fast Food');

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

	var bubble = vis.svg.selectAll("circle")
	.data(vis.data)
	.enter()
	.append("circle")
	.attr("cx", function(d) { return vis.xScale(d.fast_food); })
	.attr("cy", function(d) { return vis.yScale(d.obesity); })
	.attr("r", function(d) { return vis.radius(d.low_access); })
	.style("fill", "steelblue")
	.attr("opacity", .4)
	.on("mouseover", function(d) {
		vis.tooltip.text(d.obesity);
	});


	bubble.exit().remove();

}

/*
d3.csv("data/combined.csv", function (data) {
  data.shift(); // Remove first element with headers
  // Process data here
});*/
