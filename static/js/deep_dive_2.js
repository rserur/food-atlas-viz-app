/*
d3.csv("data/combined.csv", function (data) {
  data.shift(); // Remove first element with headers
  // Process data here
});
*/

ScatterGraph = function(_parentElement, data) {
  this.parentElement = _parentElement;
  this.data = data;
  this.initVis();
}

ScatterGraph.prototype.initVis = function(){

  var vis = this;
  var svg = d3.select("#" + vis.parentElement);

  vis.margin = {top: 20, right: 10, bottom: 50, left: 40};
  vis.width = +svg.attr("width") - vis.margin.left - vis.margin.right;
  vis.height = +svg.attr("height") - vis.margin.top - vis.margin.bottom;
  vis.g = svg.append("g")
             .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

  vis.xScale = d3.scaleLinear()
                 .range([0, vis.width]);

  vis.yScale = d3.scaleLinear()
                 .range([vis.height, 0]);

  vis.radius = d3.scaleSqrt()
              .range([1,4]);

  vis.xAxis = d3.axisBottom()
                .scale(vis.xScale)
                .ticks(8);

  vis.yAxis = d3.axisLeft()
           .scale(vis.yScale);

  vis.xScale.domain(d3.extent(vis.data, function(d) { return +d.farmersmarkets; }));
  vis.yScale.domain(d3.extent(vis.data, function(d) { return +d.obesity; }));

  vis.radius.domain(d3.extent(vis.data, function(d){
    return d.low_access;
  })).nice();

  vis.g.append('g')
       .attr('transform', 'translate(0,' + vis.height + ')')
       .attr('class', 'x axis')
       .attr("class", "deep-dive-axis")
       .call(vis.xAxis);

  vis.g.append('g')
       .attr('transform', 'translate(5, 0)')
       .attr('class', 'y axis')
       .attr("class", "deep-dive-axis")
       .call(vis.yAxis);

  vis.g.append('text')
       .attr("transform", "rotate(-90)")
       .attr('x', -140)
       .attr('y', -25)
       .attr('class', 'deep-dive-label')
       .text('Obesity Rate (%)')
       .attr("fill", "#fff");

  vis.g.append('text')
       .attr('x', (vis.width/2) + 35)
      .attr('y', vis.height + 40)
       .attr('text-anchor', 'end')
       .attr('class', 'deep-dive-label')
       .text('Farmers Markets')
       .attr("fill", "#fff");

  vis.wrangleData();
}

ScatterGraph.prototype.wrangleData = function(){
  var vis = this;
  vis.updateVis(vis.data);
}


ScatterGraph.prototype.updateVis = function(data){
  var vis = this;

  console.log("in update 2");

  var bubble = vis.g.selectAll('.bubble')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', function(d){return vis.xScale(d.farmersmarkets);})
      .attr('cy', function(d){ return vis.yScale(d.obesity); })
      .attr('r', function(d){ return vis.radius(d.low_access) * 2; })
      .attr("opacity", .2)
      .style('fill', 'rgb(34,172,138)')
      .attr("transform", "translate(30,15)scale(0.85)");


  bubble.exit().remove();

 // vis.g.selectAll('.bubble')
  //   .attr("transform", "translate(30,15)scale(0.85)");
}

ScatterGraph.prototype.brushData = function(data){
  var vis = this;

//  vis.g.selectAll('.bubble').exit().remove();

  console.log("in deep dive 2 brushData");
  console.log(data.length);

  vis.clearData();

  vis.g.selectAll('.bubble')
      .data(data)
      // .enter()
      // .append('circle')
      // .attr('class', 'bubble')
      // .attr('cx', function(d){return vis.xScale(d.farmersmarkets);})
      // .attr('cy', function(d){ return vis.yScale(d.obesity); })
      // .attr('r', function(d){ return vis.radius(d.low_access) * 2; })
      .attr("opacity", 1).exit().remove();
      // .style('fill', 'rgb(34,172,138)')
      // .attr("transform", "translate(30,15)scale(0.85)");

 // vis.g.selectAll('.bubble').exit().remove();
 // vis.updateVis(vis.data);


 // vis.g.selectAll('.bubble')
  //   .attr("transform", "translate(30,15)scale(0.85)");
}

ScatterGraph.prototype.filterData = function(state) {
   var vis = this;
    vis.g.selectAll('.bubble')
      .each(function(d) {
        if (d.state == state) {
          d3.select(this).transition().duration(400).style("opacity", "1");
        }
        else {
          d3.select(this).transition().duration(400).style("opacity", "0");
        }
      });

}

ScatterGraph.prototype.clearData = function() {
   var vis = this;
    vis.g.selectAll('.bubble')
      .data(vis.data)
      .attr("opacity", 0);


}
