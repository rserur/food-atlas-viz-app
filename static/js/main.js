let allData = [];

let us_map, deep_dive_1, deep_dive_2, deep_dive_3, selectedCounty, deep_dive_3_state;

$("#predictCalcForm").submit(function(e) {

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
           type: "POST",
           url: url,
           data: form.serialize(),
           success: function(data)
           {
						 	console.log('DID IT');
					 		$('#predicted_val_display').hide();
              $('#predicted_obesity').text(data.predictions.predicted_obesity);
							$('#predicted_val_display').fadeIn();
           }
         });

    e.preventDefault();
});

loadDbData();

function loadDbData() {
	d3.json("/load_data", function (data) {

	  data = data['food_atlas'];
		data.forEach(function(d){
			d.id = +d.id;
			d.food_tax14 = +d.food_tax14;
			d.pct_obese_adults13 = +d.pct_obese_adults13;
			d.ffrpth14 = +d.ffrpth14;
			d.pct_laccess_pop15 = +d.pct_laccess_pop15;
			d.fmrktpth16 = +d.fmrktpth16;
			d.metro13 = +d.metro13;
			d.fips = +d.fips;
			d.state = d.state;
			d.county = d.county;
		});

		filtered_data = [];
		var len = data.length;

		for (var i = 0; i < len; i++)
		{
			var obj = new Object();
			obj.obesity = data[i].pct_obese_adults13;
			obj.food_tax = data[i].food_tax14;
			obj.fast_food = data[i].ffrpth14;
			obj.low_access = data[i].pct_laccess_pop15;
			obj.farmersmarkets = data[i].fmrktpth16;
			obj.metro = data[i].metro13;
			obj.fips = data[i].fips;
			obj.county = data[i].county;
			obj.state = data[i].state;
			filtered_data.push(obj);
		}

		allData = filtered_data;
		console.log(filtered_data);
		createVis();
	});
}

//loadData();

// TODO: Move all points data is loaded to this single method.
// (lines 79-98 here and 1-22 in deep_dive_3.js)
// TODO: fetch data from API endpoint loading from database
// function loadData() {
//
// 	// ******this data should be looked at, I think it needs to have null values dropped
// 	// and metro should be a boolean
// 	d3.csv("data/combined.csv", function (data) {
// 	//  data.shift(); // Remove first element with headers
// 	  // Process data here
//
// 	  // temporary until migrated over
// 	    data = data.filter((x, i) => i % 2)
//
// 		data.forEach(function(d){
// 			d.FOOD_TAX14 = +d.FOOD_TAX14;
// 			d.PCT_OBESE_ADULTS13 = +d.PCT_OBESE_ADULTS13;
// 			d.FFRPTH14 = +d.FFRPTH14;
// 			d.PCT_LACCESS_POP15 = +d.PCT_LACCESS_POP15;
// 			d.FMRKTPTH16 = +d.FMRKTPTH16;
// 			d.METRO13 = +d.METRO13;
// 			d.FIPS = +d.FIPS;
// 			d.State = +d.State;
// 		});
//
// 		filtered_data = [];
// 		var len = data.length;
//
// 		for (var i = 0; i < len; i++)
// 		{
// 			var obj = new Object();
// 			obj.id = data[i].FIPS;
// 			obj.obesity = data[i].PCT_OBESE_ADULTS13;
// 			obj.food_tax = data[i].FOOD_TAX14;
// 			obj.fast_food = data[i].FFRPTH14;
// 			obj.low_access = data[i].PCT_LACCESS_POP15;
// 			obj.farmersmarkets = data[i].FMRKTPTH16;
// 			obj.metro = data[i].METRO13;
// 			obj.fips = data[i].FIPS;
// 			obj.county = data[i].county;
// 			obj.state = data[i].state;
// 			filtered_data.push(obj);
// 		}
//
// 	  allData = filtered_data;
// 	  //console.log(filtered_data);
// 	  createVis();
// 	});
//
// }

function createVis() {

	deep_dive_1 = new ScatterPlot("deep_dive_1_svg", allData);
	deep_dive_2 = new ScatterGraph("deep_dive_2_svg", allData);
	deep_dive_3 = new ScatterThree("deep_dive_3_svg", allData);


}

function resetVisualizations() {

	deep_dive_1.updateVis(allData);
	deep_dive_2.updateVis(allData);

	d3.select("#deep_dive_3_svg").selectAll("*").remove();
	deep_dive_3 = new ScatterThree("deep_dive_3_svg", allData);
	$('.reset-link').html('');
	$('.pred_calc_selected_county').html('the US');


}

function toggleSelect() {

	deep_dive_1.brushOn();
	console.log($('#select-button'));
	$('#select-button').html('Selection is on');
	$('#select-button').css({"color":"gray"});
	$('#select-button').css({"text-decoration":"none"});
	$('#select-button').css({"pointer-events":"none"});

	// if ($('#select-button')["0"].innerHTML == "Turn selecting off"){
	// 	deep_dive_1.brushOff();
	// 	$('#select-button').html('Turn selecting on');
	// }
	// else {
	// 	deep_dive_1.brushOn();
	// 	$('#select-button').html('Turn selecting off');
	// }

}


// identifies county clicked and filters lower visualizations to that state
const filterFromMap = (d) => {
	//allData.filter(function(obj) { return allData.fips == county} );

	// the problem is that this csv doesn't have the FIPS data in it
	selectedCounty = allData.find((obj)=> { return obj.fips == d.id });
	if(!selectedCounty){
		$('.pred_calc_selected_county').html('(click on county)');
		$("#input_1").val('');
		$("#input_2").val('');
		$("#input_3").val('');
	}

	if (selectedCounty) {
		console.log(selectedCounty.state);
		console.log(selectedCounty);

		$('.pred_calc_selected_county').html(`${selectedCounty.county}, ${selectedCounty.state}`);
		$('.reset-link').html('See all');

		// filter data to just from that state
		stateData = allData.filter(function(obj) { return obj.state == selectedCounty.state });

		console.log(stateData);
		deep_dive_1.updateVis(stateData);
		deep_dive_2.updateVis(stateData);


		d3.select("#deep_dive_3_svg").selectAll("*").remove();

		deep_dive_3 = new BarChart("deep_dive_3_svg", stateData);


		getCounties(selectedCounty.state).done(function(data) {
			counties = data['counties'];
			populateCountiesDropdown(counties);
			$('#selected_state').val(selectedCounty.state);
			$('#selected_county').val(selectedCounty.fips);
			$(".county-input").val('');
			$("#input_1").val(selectedCounty.fast_food.toFixed(2));
			$("#input_2").val(selectedCounty.farmersmarkets.toFixed(2));
			$("#input_3").val(selectedCounty.food_tax);
			$("#predictCalcForm").submit();
		});
	}



	//console.log(topojson.feature(this.data, this.counties).features);
};

// Loads a map tooltip on hover
const loadToolTip = (id) => {
	selectedCounty = allData.find((obj)=> { return obj.fips == id });
	if(!selectedCounty){
		return '<div class="tip-data"><h5>No data available for this county</h5></div>';
	}
	return '<div class="tip-data"><h5>'+ selectedCounty.county +', ' + selectedCounty.state +'</h5>' +
				 'Fast food / 1000:' +
  		 	 '<span class="tip-data">'+ selectedCounty.fast_food.toFixed(2) +'</span><br>'+
				 'Farmers markets / 1000: ' +
				 '<span class="tip-data">'+ selectedCounty.farmersmarkets.toFixed(2) +'</span><br>'+
				 'Food tax rate: ' +
				 '<span class="tip-data">'+ selectedCounty.food_tax +'</span><br>' +
				 'Obesity rate: ' +
				 '<span class="tip-data">'+ selectedCounty.obesity +'</span>' +
				 '</div>';
}

// brush and update vis functions


function isBrushed(brush_coords, cx, cy) {

	var x0 = brush_coords[0][0] ,
	 x1 = brush_coords[1][0],
	 y0 = brush_coords[0][1],
	 y1 = brush_coords[1][1];

	return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}




let map_selection = $("input[name='map_selection']:checked").val();

$(':radio[name="map_selection"]').change(function() {
  map_selection=$("input[name='map_selection']:checked").val();
  map.updateMapSelection(map_selection);
});

let counties = [];

// Dynamically populates the counties dropdown for the selected state
$('#selected_state').change(function() {

	if(!$(this).val()) return;
	getCounties($(this).val()).done(function(data) {
		counties = data['counties'];
		populateCountiesDropdown(counties);
	});
});

// Dynamically populates the inputs form based on selected county
$("#selected_county").change(function() {
	$(".county-input").val('');
	county = counties.find(c => {return c.fips == $(this).val()});
	if(!county) return;
	$("#input_1").val(county.ffrpth14);
	$("#input_2").val(county.fmrktpth16);
	$("#input_3").val(county.food_tax14);
});

// Returns ajax call to counties
function getCounties(state) {
	var counties = [];
	return $.get( "/get_counties/"+ state)
  	.done(function( data ) {
			$.each(data['counties'], function(key, county) {
				counties.push(county);
			});
  	});
}

function populateCountiesDropdown(counties) {
	var option = '<option val="">Select county</option>';
	$("#selected_county").html(option);
	$.each(counties, function(key, county) {
		option = '<option value="'+ county.fips +'">' + county.county + '</option>';
		$("#selected_county").append(option);
	});
}

const mapVariableOptions = {
  pop15: { variableCode: "PCT_LACCESS_POP15", variableName: "Population, low access to store (%), 2015", variableColorScheme: d3.schemeBlues[9]},
  lowi15: { variableCode: "PCT_LACCESS_LOWI15", variableName: "Low income & low access to store (%), 2015", variableColorScheme: d3.schemePuBu[9]},
  hhnv15: { variableCode: "PCT_LACCESS_HHNV15", variableName: "Households, no car & low access to store (%), 2015", variableColorScheme: d3.schemeReds[9]},
  // snapspth16: { variableCode: "SNAPSPTH16", variableName: "SNAP-authorized stores/1,000 pop, 2016", variableColorScheme: d3.schemeRdPu[9].reverse() },
  ffrpth14: { variableCode: "FFRPTH14", variableName: "Fast-food restaurants/1,000 pop, 2014", variableColorScheme: d3.schemeYlOrRd[9]},
  // snap16: { variableCode: "PCT_SNAP16", variableName: "SNAP participants (% pop), 2016", variableColorScheme: d3.schemePurples[9]},
  fmrktpth16: { variableCode: "FMRKTPTH16", variableName: "Farmers' markets/1,000 pop, 2016", variableColorScheme: d3.schemeGreens[9].reverse() }
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
  .defer(d3.csv, "/data/df_for_webapp.csv", function(d) {
      map.d3_map.set(d.FIPS, {
        pop15: d[mapVariableOptions.pop15.variableCode],
        lowi15: d[mapVariableOptions.lowi15.variableCode],
        hhnv15: d[mapVariableOptions.hhnv15.variableCode],
        // snapspth16: d[mapVariableOptions.snapspth16.variableCode],
        ffrpth14: d[mapVariableOptions.ffrpth14.variableCode],
        // snap16: d[mapVariableOptions.snap16.variableCode],
        fmrktpth16: d[mapVariableOptions.fmrktpth16.variableCode],
      })
  })
  .await(draw_map);

function draw_map(error, us) {
  if (error) throw error;

  map.initMap(us);
}

var color = d3.scaleQuantize()
    .domain([0, 100])
    .range(d3.schemeRdYlGn[9].reverse());

var x = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([600, 860]);

function resetPredictCalcForm() {
	document.getElementById("input_1").value = "";
	document.getElementById("input_2").value = "";
	document.getElementById("input_3").value = "";
	document.getElementById("predicted_val_display").innerHTML = "";
}
