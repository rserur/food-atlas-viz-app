BarChart = function(_parentElement, _data){
	this.parentElement = _parentElement;
	this.data = _data;
	this.displayData = []; 
	this.initVis();

}

BarChart.prototype.initVis = function(){

  var vis = this;
  var svg = d3.select("#" + vis.parentElement);
  var food_tax_rate = vis.data[0].food_tax;
  var map = vis.data.map(function(d,i){ return parseFloat(d.obesity); });

  console.log(map);

  vis.margin = {top: 20, right: 10, bottom: 50, left: 40};
  vis.width = +svg.attr("width") - vis.margin.left - vis.margin.right;
  vis.height = +svg.attr("height") - vis.margin.top - vis.margin.bottom;
  vis.g = svg.append("g")
             .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


   vis.xScale = d3.scaleLinear()
 	.domain([d3.min(map), d3.max(map)])
 	.rangeRound([0, vis.width]);

   vis.bins = d3.histogram()
  	.domain(vis.xScale.domain())
  	.thresholds(vis.xScale.ticks(8))
  	(map);

   vis.yScale = d3.scaleLinear()
   	.domain([0, d3.max(vis.bins, function(d) { return d.length; })])
   	.range([vis.height, 0]);

  // Creating Axes
  vis.xAxis = d3.axisBottom()
    .scale(vis.xScale)
    .ticks(8);

  // vis.yAxis = d3.axisLeft()
  //   .scale(vis.yScale);
    // .ticks(5);


   console.log(vis.bins);


  vis.g.append('g')
    .attr('transform', 'translate(0,' + vis.height + ')')
    .attr('class', 'x axis')
    .attr("class", "deep-dive-axis")
    .call(vis.xAxis);

  vis.tooltip = vis.g.append("g")
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .text("")
    .attr("fill", "#fff");

  vis.label = vis.g.append("g")
    .append("text")
    .attr("x", -40)
    .attr("y", 0)
    .attr("fill", "#fff")
    .style("font-size", "14px")
    .text("Food tax: ");

  vis.label_value = vis.g.append("g")
    .append("text")
    .attr("x", -40)
    .attr("y", 16)
    .attr("fill", "#00BC8C")
    .style("font-size", "18px")
    .text(food_tax_rate + "%");

  vis.g.append('text')
       .attr('x', (vis.width/2) + 70)
       .attr('y', vis.height + 40)
       .attr('text-anchor', 'end')
       .attr('class', 'deep-dive-label')
       .text('Obesity Rate (%)')
       .attr("fill", "#fff");

  vis.wrangleData();

}


BarChart.prototype.wrangleData = function(){
  var vis = this;
  vis.updateVis(vis.data);
}


BarChart.prototype.updateVis = function(data){
  var vis = this;

  var formatCount = d3.format(",.0f");

  var bar = vis.g.selectAll(".bar")
  .data(vis.bins)
  .enter()
  .append("g")
  	.attr("class", "bar")
  	.attr("transform", function(d) { return "translate(" + vis.xScale(d.x0) + "," + vis.yScale(d.length) + ")"; });


  bar.append("rect")
  .attr("width", (vis.xScale(vis.bins[1].x1) - vis.xScale(vis.bins[1].x0)))
  .attr("height", function(d) { return vis.height - vis.yScale(d.length); })
  .attr("fill", "rgb(248,196,113)");

  bar.append("text")
    .attr("x", (vis.xScale(vis.bins[1].x1) - vis.xScale(vis.bins[1].x0)) / 2)
    .attr("y", -4)
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .text(function(d) { return formatCount(d.length); });


  bar.exit().remove();


}
