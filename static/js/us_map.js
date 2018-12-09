// var map = d3.select("#food-atlas-map");
var svg = d3.select("svg");

var food_atlas_map = d3.map();

color = d3.scaleQuantize()
    .domain([0, 100])
    .range(d3.schemeRdYlGn[9].reverse());

var x = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([600, 860]);

// Create element for legend
var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

// Legend title - "Low income & low access to store (%), 2015"
g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Population, low access to store (%), 2015");

// Legend markings - 2%, 3%, etc.
g.call(d3.axisBottom(x)
    .tickSize(8)
    .tickFormat(function(x, i) { return i ? x : x + "%"; })
    .tickValues(color.domain()))
  .select(".domain")
    .remove();

var path = d3.geoPath();

    // Create element for legend
    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(0,40)");

    // Legend color scale
    g.selectAll("rect")
      .data(color.range().map(function(d) {
          d = color.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        }))
      .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return color(d[0]); });


d3.queue()
  .defer(d3.json, "https://d3js.org/us-10m.v1.json")
  .defer(d3.csv, "/static/data/food_atlas_data.csv", function(d) {
    food_atlas_map.set(d.id, {
      pop15: d.PCT_LACCESS_POP15,
      lowi15: d.PCT_LACCESS_LOWI15,
      hhnv15: d.PCT_LACCESS_HHNV15,
      snapspth16: d.SNAPSPTH16,
      ffrpth14: d.FFRPTH14,
      snap16: d.PCT_SNAP16,
      fmrktpth16: d.FMRKTPTH16
    })
  })
  // .defer(d3.csv, "/static/data/food_atlas_data.csv", function(d) { debugger; })
  .await(draw_map);

function draw_map(error, us) {
  if (error) throw error;

  svg.append("g")
    .attr("class", "counties")
  .selectAll("path")
  .data(topojson.feature(us, us.objects.counties).features)
  .enter().append("path")
    .attr("fill", function(d) {
      if (food_atlas_map.get(d.id)) {
        return color(food_atlas_map.get(d.id).pop15)
      }
    })
    .attr("d", path)
    .attr("id", function(d) { return d.id }); // id is FIPS

  svg.append("path")
    .attr("class", "county-borders")
    .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; })));

  svg.append("path")
    .attr("class", "nation-border")
    .attr("d", path(topojson.feature(us, us.objects.nation)));
}
;
