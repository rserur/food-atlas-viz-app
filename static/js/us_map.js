class Map {
  constructor({ mapSelection, parentElement } = {}) {
    this.d3_map = d3.map();
    this.mapSelection = mapSelection;
    this.parentElement = parentElement;
  }

  updateMapSelection(mapSelection) {
    this.mapSelection = mapSelection;
    this.updateVis()
  }

  updateData(data) {
    this.data = data;
    this.counties = data.objects.counties;
    this.nation = data.objects.nation;
    this.updateVis();
  }

  initVis(data) {
    this.svg = d3.select("#" + this.parentElement)
      .append("svg")
      .attr("width", 960)
      .attr("height", 600);

    // Create element for legend
    const g = this.svg.append("g")
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

    this.path = d3.geoPath();

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

    this.updateData(data);
  }

  updateVis() {
    this.svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .exit().remove()
    .data(topojson.feature(this.data, this.counties).features)
    .enter().append("path")
      .attr("fill", (d) => {
        if (this.d3_map.get(d.id)) {
          return color(this.d3_map.get(d.id)[map_selection])
        }
      })
      .attr("d", this.path)
      .attr("id", function(d) { return d.id }); // id is FIPS

    this.svg.append("path")
      .attr("class", "county-borders")
      .attr("d", this.path(topojson.mesh(this.data, this.counties, function(a, b) { return a !== b; })));

    this.svg.append("path")
      .attr("class", "nation-border")
      .attr("d", this.path(topojson.feature(this.data, this.nation)));
  }
}
