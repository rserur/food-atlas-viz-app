// TODO: Fix D3 enter, update, and exit pattern
// TODO: Dynamically update legend, color scheme, and ranges based on mapSelection
// US MAP Class
// some sources drawn upon:
// https://bl.ocks.org/mbostock/4122298
// http://bl.ocks.org/bycoffe/5871252
// https://github.com/stirlingw/Harvard-CS171/blob/master/LAB7/CS171-Lab7-Instructions.pdf
class Map {
  constructor({ mapSelection, parentElement } = {}) {
    this.d3_map = d3.map();
    this.mapSelection = mapSelection;
    this.mapVariableOptions = mapVariableOptions;
    this.parentElement = parentElement;
  }

  updateMapSelection(mapSelection) {
    this.mapSelection = mapSelection;
    this.updateMap()
  }

  updateData(data) {
    this.data = data;
    this.counties = data.objects.counties;
    this.nation = data.objects.nation;
    this.updateLegend();
    this.updateMap();
  }

  initMap(data) {
    this.svg = d3.select("#" + this.parentElement)
      .append("svg")
      .attr("width", 768)
      .attr("height", 480)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 768 600")
      .classed("us-map", true);

    // Create element for legend
    const g = this.svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(0,40)");

    // Tooltip
    this.tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return loadToolTip(d.id);
      });

    this.svg.call(this.tip);

    // Legend title
    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#fff")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(this.mapVariableOptions[this.mapSelection].variableName);

    // Legend markings - 2%, 3%, etc.
    g.call(d3.axisBottom(x)
        .tickSize(8)
        .tickFormat(function(x, i) { return i ? x : x + "%"; })
        .tickValues(color.domain()))
      .select(".domain")
        .remove();

    this.path = d3.geoPath();

    this.updateData(data);
  }

  updateMap() {

    color.range(this.mapVariableOptions[this.mapSelection].variableColorScheme);

    this.svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .exit().remove()
    .data(topojson.feature(this.data, this.counties).features)
    .enter().append("path")
      .attr("fill", (d) => {
        d.id = + d.id;
        if (this.d3_map.get(d.id)) {
          return color(this.d3_map.get(d.id)[map_selection])
        }
        else{
          console.log('id not found: ' + d.id);
          console.log(d);
        }
      })
      .attr("d", this.path)
      .attr("id", function(d) { return d.id })
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide)
      .on("click", function(d) {
        console.log(d);
        filterFromMap(d);
      }); // id is FIPS value

    this.svg.append("path")
      .attr("class", "county-borders")
      .attr("d", this.path(topojson.mesh(this.data, this.counties, function(a, b) { return a !== b; })));

    this.svg.append("path")
      .attr("class", "nation-border")
      .attr("d", this.path(topojson.feature(this.data, this.nation)));

    this.updateLegend();
  }

  updateLegend() {
    d3.select(".caption")
      .text(this.mapVariableOptions[this.mapSelection].variableName);

    // Legend color scale
    const key = d3.select(".key");

    key.selectAll('rect')
       .remove();

    var block = key.selectAll("rect")
                   .data(color.range().map(function(d) {
                    d = color.invertExtent(d);
                    if (d[0] == null) d[0] = x.domain()[0];
                    if (d[1] == null) d[1] = x.domain()[1];
                    return d;
                  }));

    block.enter()
          .append("rect")
          .attr("height", 8)
          .attr("x", function(d) { return x(d[0]); })
          .attr("width", function(d) { return x(d[1]) - x(d[0]); })
          .attr("fill", function(d) { return color(d[0]); });
  }

}
