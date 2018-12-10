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
}