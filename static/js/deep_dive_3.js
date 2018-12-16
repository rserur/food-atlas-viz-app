ScatterThree = function(_parentElement, data) {
  this.parentElement = _parentElement;
  this.data = data;
  this.initVis();
}

ScatterThree.prototype.initVis = function(){

  var vis = this;

  var svg = d3.select("#deep_dive_3_svg");

      vis.margin = {top: 20, right: 10, bottom: 50, left: 40},
      vis.width = +svg.attr("width") - vis.margin.left - vis.margin.right,
      vis.height = +svg.attr("height") - vis.margin.top - vis.margin.bottom,
      vis.g = svg.append("g").attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

  vis.radius = d3.scaleSqrt()
    .range([2,5]);

  // Creating xScale and yScale
  vis.xScale = d3.scaleLinear()
    .range([0, vis.width]);
  vis.yScale = d3.scaleLinear()
    .range([vis.height, 0]);

    // Defining domains
  vis.xScale.domain(d3.extent(vis.data, function(d){
    return d.food_tax;
  }));
  vis.yScale.domain(d3.extent(vis.data, function(d){
    return d.obesity;
  }));
  vis.radius.domain(d3.extent(vis.data, function(d){
    return d.low_access;
  })).nice();

  // Creating Axes
  vis.xAxis = d3.axisBottom()
    .scale(vis.xScale)
    .ticks(8);

  vis.yAxis = d3.axisLeft()
    .scale(vis.yScale);
    // .ticks(5);

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

  vis.tooltip = vis.g.append("g")
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .text("")
    .attr("fill", "#fff");

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
       .text('Food Tax')
       .attr("fill", "#fff");

  vis.wrangleData();
}

ScatterThree.prototype.wrangleData = function(){
  var vis = this;
  vis.updateVis(vis.data);
}


ScatterThree.prototype.updateVis = function(data){
  var vis = this;

  var bubble;

  bubble = vis.g.selectAll('.bubble')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'bubble')
    .attr('cx', function(d){ return vis.xScale(d.food_tax); })
    .attr('cy', function(d){ return vis.yScale(d.obesity); })
    .attr('r', function(d){ return vis.radius(d.low_access); })
    .attr("opacity", .3)
    .style('fill', 'rgb(248,196,113)')
    .on("mouseover", function(d) {
      vis.tooltip.text(d.obesity);
    })
    .on("mouseout", function(d) {
      vis.tooltip.text("");
    });

  bubble.
        attr("transform", "translate(5,0)scale(0.85)");


  bubble.exit().remove();

}

ScatterThree.prototype.brushData = function(data){
  var vis = this;

  console.log("in deep dive 2 brushData");
  console.log(data.length);

  vis.clearData();

  vis.g.selectAll('.bubble')
      .data(data)
      .attr("opacity", 1).exit().remove();

}

ScatterThree.prototype.filterData = function(state) {
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

ScatterThree.prototype.clearData = function() {
   var vis = this;
    vis.g.selectAll('.bubble')
      .data(vis.data)
      .attr("opacity", 0);

}
