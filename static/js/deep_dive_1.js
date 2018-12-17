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
	this.initVis();


	// IDEA - have the filter on map auto filter on google maps to show all grocery stores/fast food
}

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

ScatterPlot.prototype.initVis = function(){
	var vis = this;

	vis.margin = { top: 20, right: 10, bottom: 40, left: 40 };

	vis.width = 280 - vis.margin.left - vis.margin.right,
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
  		.scale(vis.xScale)
  		.ticks(8);

  	vis.yAxis = d3.axisLeft()
  		.scale(vis.yScale);

  	vis.radius.domain(d3.extent(vis.data, function(d){ return d.low_access; })).nice();

  	// changed these both from "g" to "svg" for some reason
  	vis.svg.append("g")
	  .attr("transform", "translate(0, "+vis.height+")")
    .attr("class", "deep-dive-axis")
	  .call(vis.xAxis);

	vis.svg.append("g")
    .attr("class", "deep-dive-axis")
	  .call(vis.yAxis);

	vis.tooltip = vis.svg.append("g")
		.append("text")
		.attr("x", 10)
		.attr("y", 10)
		.text("")
    .attr("fill", "#fff");

	vis.svg.append('text')
    .attr("transform", "rotate(-90)")
    .attr('x', -140)
    .attr('y', -25)
    .attr('class', 'deep-dive-label')
    .text('Obesity Rate (%)')
    .attr("fill", "#fff");

  	vis.svg.append('text')
    .attr('x', (vis.width/2) + 35)
    .attr('y', vis.height + 40)
    .attr('text-anchor', 'end')
    .attr('class', 'deep-dive-label')
    .text('Fast Food')
    .attr("fill", "#fff");


	vis.wrangleData();

}

/*
 * Data wrangling
 */

ScatterPlot.prototype.wrangleData = function(){
	var vis = this;

	//vis.stackedData = vis.stack(vis.transposedData);

	// In the first step no data wrangling/filtering needed
	vis.displayData = vis.data;
	vis.updateVis(vis.data);
}

ScatterPlot.prototype.updateVis = function(data){
	var vis = this;

	var bubble = vis.svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d) { return vis.xScale(d.fast_food); })
	.attr("cy", function(d) { return vis.yScale(d.obesity); })
	.attr("r", function(d) { return vis.radius(d.low_access); })
	.style("fill", function(d) {
		var color;
		if (d.metro == 1) {
			color = 'steelblue';
		}
		else {
			color = 'purple';
		}
		return color;
	})
	.attr("opacity", .3)
	.attr("class", "non_brushed")
	.on("mouseover", function(d) {
		vis.tooltip.text(d.obesity);
	})
    .on("mouseout", function(d) {
      vis.tooltip.text("");
    });

    //testing brushed data
    vis.brush = d3.brush()
    .on("brush", highlightCircles);

    vis.svg.append("g").call(vis.brush);




    function highlightCircles() {

		if (d3.event.selection != null) {
	      	bubble.attr("class", "non_brushed").attr("opacity", ".3");


			var brush_coords = d3.brushSelection(this);

			bubble.filter(function () {
			var cx = d3.select(this).attr("cx"),
			    cy = d3.select(this).attr("cy");

			return isBrushed(brush_coords, cx, cy);
			})
			.attr("class", "brushed")
			.attr("opacity", "1");


			var brushed_data = d3.selectAll(".brushed").data();
			console.log("deep dive 1 brushed data: ", brushed_data.length);

			if (brushed_data.length > 0) {
				deep_dive_2.brushData(brushed_data);
				deep_dive_3.brushData(brushed_data);
			}
			else {
				deep_dive_2.updateVis(allData);
				deep_dive_3.updateVis(allData);
			}

		}
		else {
			deep_dive_2.updateVis(allData);
		}

    }


	bubble.exit().remove();

}

ScatterPlot.prototype.filterData = function(state) {
   var vis = this;
    vis.svg.selectAll('circle')
      .each(function(d) {
        if (d.state == state) {
          d3.select(this).transition().duration(400).style("opacity", "1");
        }
        else {
          d3.select(this).transition().duration(400).style("opacity", "0");
        }
      });

}

ScatterPlot.prototype.revealData = function() {
   var vis = this;
   vis.svg.selectAll('circle').transition().duration(400).style("opacity", .3);
}

/*
d3.csv("data/combined.csv", function (data) {
  data.shift(); // Remove first element with headers
  // Process data here
});*/
