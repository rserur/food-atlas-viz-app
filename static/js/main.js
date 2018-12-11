var allData = [];

var us_map, deep_dive_1, deep_dive_2, deep_dive_3;

loadData();

function loadData() {

	// ******this data should be looked at, I think it needs to have null values dropped
	// and metro should be a boolean
	d3.csv("data/combined.csv", function (data) {
	//  data.shift(); // Remove first element with headers
	  // Process data here

	  // temporary until migrated over
	    data = data.filter((x, i) => i % 2)

		data.forEach(function(d){
			d.FOOD_TAX14 = +d.FOOD_TAX14;
			d.PCT_OBESE_ADULTS13 = +d.PCT_OBESE_ADULTS13;
			d.FFRPTH14 = +d.FFRPTH14;
			d.PCT_LACCESS_POP15 = +d.PCT_LACCESS_POP15;
			d.FMRKTPTH16 = +d.FMRKTPTH16;
		});

		filtered_data = [];
		var len = data.length;

		for (var i = 0; i < len; i++)
		{
			var obj = new Object();
			obj.obesity = data[i].PCT_OBESE_ADULTS13;
			obj.food_tax = data[i].FOOD_TAX14;
			obj.fast_food = data[i].FFRPTH14;
			obj.low_access = data[i].PCT_LACCESS_POP15;
			obj.farmersmarkets = data[i].FMRKTPTH16;
			filtered_data.push(obj);
		}

	  allData = filtered_data;
	  //console.log(filtered_data);
	  createVis();
	});

}

function createVis() {
	//console.log(allData);
	deep_dive_1 = new ScatterPlot("deep_dive_1_svg", allData);
	deep_dive_2 = new ScatterGraph("deep_dive_2_svg", allData);
}

let map_selection = $("input[name='map_selection']:checked").val();

$(':radio[name="map_selection"]').change(function() {
  map_selection=$("input[name='map_selection']:checked").val();
  map.updateMapSelection(map_selection);
});

const mapVariableOptions = {
  pop15: { variableCode: "PCT_LACCESS_POP15", variableName: "Population, low access to store (%), 2015" },
  lowi15: { variableCode: "PCT_LACCESS_LOWI15", variableName: "Low income & low access to store (%), 2015" },
  hhnv15: { variableCode: "PCT_LACCESS_HHNV15", variableName: "Households, no car & low access to store (%), 2015" },
  snapspth16: { variableCode: "SNAPSPTH16", variableName: "SNAP-authorized stores/1,000 pop, 2016" },
  ffrpth14: { variableCode: "FFRPTH14", variableName: "Fast-food restaurants/1,000 pop, 2014" },
  snap16: { variableCode: "PCT_SNAP16", variableName: "SNAP participants (% pop), 2016" },
  fmrktpth16: { variableCode: "FMRKTPTH16", variableName: "Farmers' markets/1,000 pop, 2016" }
}
const map = new Map(
  {
    parentElement: 'food-atlas-map',
    mapSelection: map_selection,
    mapVariableOptions: mapVariableOptions
  }
);

d3.queue()
  .defer(d3.json, "https://d3js.org/us-10m.v1.json")
  .defer(d3.csv, "/static/data/food_atlas_data.csv", function(d) {
      map.d3_map.set(d.id, {
        pop15: d[mapVariableOptions.pop15.variableCode],
        lowi15: d[mapVariableOptions.lowi15.variableCode],
        hhnv15: d[mapVariableOptions.hhnv15.variableCode],
        snapspth16: d[mapVariableOptions.snapspth16.variableCode],
        ffrpth14: d[mapVariableOptions.ffrpth14.variableCode],
        snap16: d[mapVariableOptions.snap16.variableCode],
        fmrktpth16: d[mapVariableOptions.fmrktpth16.variableCode]
      })
  })
  .await(draw_map);

function draw_map(error, us) {
  if (error) throw error;

  map.initVis(us);
}

var color = d3.scaleQuantize()
    .domain([0, 100])
    .range(d3.schemeRdYlGn[9].reverse());

var x = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([600, 860]);
