d3.csv("/data/combined.csv", function (data) {
  data = data.filter((x, i) => i % 2)
  // Process data here
  data.forEach(function(d){
    d.FOOD_TAX14 = +d.FOOD_TAX14;
    d.PCT_OBESE_ADULTS13 = +d.PCT_OBESE_ADULTS13;
  });

  filtered_data = [];
  var len = data.length;
  // data  = JSON.stringify(data);
  for (var i = 0; i < len; i++)
	{
		 var obj = new Object();
		 obj.obesity = data[i].PCT_OBESE_ADULTS13;
		 obj.food_tax = data[i].FOOD_TAX14;
		 obj.low_access = data[i].PCT_LACCESS_POP15;
	   filtered_data.push(obj);
	}
	// filtered_data.push(JSON.stringify(obj));
  draw_viz_3(filtered_data);
});

function draw_viz_3(data) {
	var svg = d3.select("#deep_dive_3_svg");

      margin = {top: 20, right: 10, bottom: 50, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   var radius = d3.scaleSqrt()
    .range([2,5]);

  // Creating xScale and yScale
  var xScale = d3.scaleLinear()
    .range([0, width]);
  var yScale = d3.scaleLinear()
    .range([height, 0]);

    // Defining domains
  xScale.domain(d3.extent(data, function(d){
    return d.food_tax;
  }));
  yScale.domain(d3.extent(data, function(d){
    return d.obesity;
  }));
  radius.domain(d3.extent(data, function(d){
    return d.low_access;
  })).nice();

  // Creating Axes
  var xAxis = d3.axisBottom()
    .scale(xScale);
    // .ticks(5);
  var yAxis = d3.axisLeft()
    .scale(yScale);
    // .ticks(5);

  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'x axis')
    .call(xAxis);

  g.append("g")
      .call(yAxis);

  // Creating scatter plot bubbles
  var bubble;
  bubble = g.selectAll('.bubble')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'bubble')
    .attr('cx', function(d){ return xScale(d.food_tax); })
    .attr('cy', function(d){ return yScale(d.obesity); })
    .attr('r', function(d){ return radius(d.low_access); })
    .attr("opacity", .4)
    .style('fill', 'green');

  bubble.
        attr("transform", "translate(0,0)scale(0.85)");

  // Adding axex label
  g.append('text')
    .attr("transform", "rotate(-90)")
    .attr('x', -90)
    .attr('y', -28)
    .attr('class', 'label')
    .text('Obesity');

  g.append('text')
    .attr('x', (width/2) + 60)
    .attr('y', height + 35)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .text('Food Tax');
}


