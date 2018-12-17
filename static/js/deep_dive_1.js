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

	vis.margin = { top: 20, right: 10, bottom: 50, left: 40 };

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
	vis.brushOn();
	//vis.updateVis(vis.data);
}

ScatterPlot.prototype.updateVis = function(data){
	var vis = this;

	vis.svg.selectAll('circle').remove();

	var bubble = vis.svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d) { return vis.xScale(d.fast_food); })
	.attr("cy", function(d) { return vis.yScale(d.obesity); })
	.attr("r", function(d) { return vis.radius(d.low_access); })
	.style("fill", "#8C1D6E")
	// .style("fill", function(d) {
	// 	var color;
	// 	if (d.metro == 1) {
	// 		color = '#104175';
	// 	}
	// 	else {
	// 		color = '#BC786D';
	// 	}
	// 	return color;
	// })
	.attr("opacity", .3)
	.attr("class", "non_brushed")
	.on("mouseover", function(d) {
		// if (d.metro == 1) {
		// 	vis.tooltip.text(d.county + ", " + d.state + " (metro)");
		// }
		vis.tooltip.text(d.county + ", " + d.state);
	})
    .on("mouseout", function(d) {
      vis.tooltip.text("");
    });

    //testing brushed data
    // vis.brush = d3.brush()
    // .on("brush", highlightCircles);

    // vis.svg.append("g").call(vis.brush);

	vis.tooltip = vis.svg.append("g")
		.attr('class', 'chart-tooltip')
		.append("text")
		.attr("x", 10)
		.attr("y", 10)
		.text("")
    	.attr("fill", "#fff");



	bubble.exit().remove();

}

ScatterPlot.prototype.brushOn = function(){
    //testing brushed data
    var vis = this;

    vis.brush = d3.brush()
    .on("brush", highlightCircles);

    vis.svg.append("g").call(vis.brush);

    function highlightCircles() {

    	var bubble = vis.svg.selectAll("circle");

    	// vis.svg.on("click", function(d) {
    	// 	d3.select("vis.brush").call(vis.brush.extent([0, 0]));
    	// });

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

			if (brushed_data.length > 0) {
				deep_dive_2.updateVis(brushed_data);
				deep_dive_3.updateVis(brushed_data);

				// if ($('#see-all-data')["0"].innerHTML == "") {

				// 	deep_dive_3.updateVis(brushed_data);
				// }
				// else {
				// 	console.log("thinks in selected county while brushed");
				// 	d3.select("#deep_dive_3_svg").selectAll("*").remove();
				// 	deep_dive_3 = new BarChart("deep_dive_3_svg", brushed_data);
				//}
				
			}
			else {

				if (selectedCounty) {
					stateData = allData.filter(function(obj) { return obj.state == selectedCounty.state });
					deep_dive_2.updateVis(stateData);
					//deep_dive_3.updateVis(stateData);
				}
				else {
					deep_dive_2.updateVis(allData);
					deep_dive_3.updateVis(allData);
				}

				// if (selectedCounty) {
				// 	stateData = allData.filter(function(obj) { return obj.state == selectedCounty.state });
				// 	deep_dive_2.updateVis(stateData);

				// 	console.log("thinks in selected county");

				// 	d3.select("#deep_dive_3_svg").selectAll("*").remove();
				// 	deep_dive_3 = new BarChart("deep_dive_3_svg", stateData);					
				// }
				// else {
				// 	//resetVisualizations();
				// 	deep_dive_2.updateVis(allData);
				// 	d3.select("#deep_dive_3_svg").selectAll("*").remove();
				// 	deep_dive_3 = new ScatterThree("deep_dive_3_svg", allData);
				// }

			}

		}
		else {
			deep_dive_2.updateVis(allData);
			deep_dive_3.updateVis(allData);
		}

    }

    //TESTING OUT PUTTING THIS HERE SO BUBBLES ARE ON TOP OF BRUSH
    vis.updateVis(vis.data);

}

ScatterPlot.prototype.brushOff = function() {
	var vis = this;

	vis.brush = null;
	console.log(vis.brush);

}

