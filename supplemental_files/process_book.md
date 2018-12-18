# Process Book

 - [Overview](#overview)
 - [Timeline](#timeline)
 - [Roles & Responsibilities](#roles)
 - [Ideas & Strategies](#ideas)
 - [Current Status/TODO](#todo)
 - [Database Schema](#schema)
 - [Frontend & Visualizations](#visualizations)
 - [Presentation](#presentation)

## <a name="overview"></a>Overview

The aim of our project is to derive insights about food distribution and the availability of healthy eating options in the US using data from the USDA Food Environment Atlas, supplemented with data from the USDA Branded Food Products Database.

The Food Environment Atlas contains data at the county level and has many features, including access to restaurants, grocery stores, farmers markets and welfare programs, as well as demographic and health data. The Food Products Database contains the nutritional composition of branded and private-label foods.

We plan to produce a web app that features an interactive map of the US to visually display food access data, and a prediction calculator.


## <a name="timeline"></a>Task Timeline

We've decided to work concurrently on the various tasks required for our project, and have allocated the next four weeks to:



- [X]   **Week 1**: We plan to spend the majority of week one exploring the datasets, refining the questions we'd like the data to answer, and identifying the variables that we'll use in our model. We'll also spend some time building the basic US map visualization and scaffolding out the web app.
- [x]   **Week 2**: This week will be spent working with Tableau to help us visualize the data, and building the model that that app will use. We'll also decide on the exact D3 visualizations that we will include.
- [X]   **Week 3**: Populate the map visualization and build and test the prediction calculator.  
- [ ]   **Week 4**: Finalize the visualizations, trying to use the data to tell a cohesive story.


## <a name="roles"></a>Roles and Responsibilities

We plan to use a [trello board](https://trello.com/invite/b/nV0Dk09z/14cb1550724df0a1790802d0c9cb6402/e14a-team-project) to keep track of our assigned tasks. We'll also check in during weekly meetings, and communicate via Slack.

As a group, we are all very interested in diving into the data science aspect of this project, so all four of us will collaborate on that. Additionally, Tushal Desai and Gabe Mansur will handle back-end development, and Rachael Serur and Rebecca Larson will focus on data visualization.


# <a name="ideas"></a>Ideas & Strategies

*   Design a map for policymakers
*   Will have to do it by state because each data point (row) is a county
*   Have a model for each state and predict how the obesity rate (any health disease) would change if they changed X about the state
    *   Ex: Would the obesity rate decrease if 20 more grocery stores were added?
*   IF TIME (likely not): can we get more granular, for example, if a whole foods specifically was added?
*   IF TIME: can we get better data for massachusetts, so we could do it by county?
*   Can we improve predictions by augmenting with additional county data and grouping via demographic correlates? (e.g. [http://www.statsamerica.org/uscp/](http://www.statsamerica.org/uscp/)) What if we asked for predictions for counties with median incomes > 90K,  80K-89K, etc... ? Or find some other way to group counties together besides the fact that they share a state?


## <a name="backend"></a>Backend


### Database

[Schema](#schema)

Features List:


<table>
  <tr>
   <td><strong>Variable name</strong>
   </td>
   <td><strong>Variable code</strong>
   </td>
   <td><strong>Comments</strong>
   </td>
  </tr>
  <tr>
   <td>Population, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_POP15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Low income & low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_LOWI15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Households, no car & low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_HHNV15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>SNAP households, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_SNAP15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Children, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_CHILD15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Seniors, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_SENIORS15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>White, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_WHITE15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Black, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_BLACK15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Hispanic ethnicity, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_HISP15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Asian, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_NHASIAN15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>American Indian or Alaska Native, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_NHNA15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Hawaiian or Pacific Islander, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_NHPI15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Multiracial, low access to store (%), 2015
   </td>
   <td>PCT_LACCESS_MULTIR15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Grocery stores/1,000 pop, 2014
   </td>
   <td>GROCPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Supercenters & club stores/1,000 pop, 2014
   </td>
   <td>SUPERCPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Convenience stores/1,000 pop, 2014
   </td>
   <td>CONVSPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Specialized food stores/1,000 pop, 2014
   </td>
   <td>SPECSPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>SNAP-authorized stores/1,000 pop, 2016
   </td>
   <td>SNAPSPTH16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Fast-food restaurants/1,000 pop, 2014
   </td>
   <td>FFRPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Full-service restaurants/1,000 pop, 2014
   </td>
   <td>FSRPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>SNAP participants (% pop), 2016*
   </td>
   <td>PCT_SNAP16
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>National School Lunch Program participants (% pop), 2015*
   </td>
   <td>PCT_NSLP15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>School Breakfast Program participants (% pop), 2015*
   </td>
   <td>PCT_SBP15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td><del>Summer Food Program participants (change % pop), 2009-15*</del>
<p>
Summer Food Service Program participants (% pop), 2015*
   </td>
   <td><del>PCH_SFSP_09_15</del>
<p>
PCT_SFSP15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>WIC participants (% pop), 2015*
   </td>
   <td>PCT_WIC15
   </td>
   <td>Demographic (maybe can use in prediction calc?)
   </td>
  </tr>
  <tr>
   <td>Soda sales tax, retail stores, 2014*
   </td>
   <td>SODATAX_STORES14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Soda sales tax, vending, 2014*
   </td>
   <td>SODATAX_VENDM14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Chip & pretzel sales tax, retail stores, 2014*
   </td>
   <td>CHIPSTAX_STORES14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Chip & pretzel sales tax, vending, 2014*
   </td>
   <td>CHIPSTAX_VENDM14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>General food sales tax, retail stores, 2014*
   </td>
   <td>FOOD_TAX14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets/1,000 pop, 2016
   </td>
   <td>FMRKTPTH16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report accepting SNAP (%), 2016
   </td>
   <td>PCT_FMRKT_SNAP16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report accepting WIC (%), 2016
   </td>
   <td>PCT_FMRKT_WIC16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report accepting WIC Cash (%), 2016
   </td>
   <td>PCT_FMRKT_WICCASH16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report accepting SFMNP (%), 2016
   </td>
   <td>PCT_FMRKT_SFMNP16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report accepting credit cards (%), 2016
   </td>
   <td>PCT_FMRKT_CREDIT16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report selling fruit & vegetables (%), 2016
   </td>
   <td>PCT_FMRKT_FRVEG16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report selling animal products (%), 2016
   </td>
   <td>PCT_FMRKT_ANMLPROD16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report selling baked/prepared food products (%), 2016
   </td>
   <td>PCT_FMRKT_BAKED16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Farmers' markets that report selling other food products (%), 2016
   </td>
   <td>PCT_FMRKT_OTHERFOOD16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Food hubs, 2016
   </td>
   <td>FOODHUB16
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Adult diabetes rate, 2013
   </td>
   <td>PCT_DIABETES_ADULTS13
   </td>
   <td>Response
   </td>
  </tr>
  <tr>
   <td>Adult obesity rate, 2013
   </td>
   <td>PCT_OBESE_ADULTS13
   </td>
   <td>Response
   </td>
  </tr>
  <tr>
   <td>High schoolers physically active (%), 2015*
   </td>
   <td>PCT_HSPA15
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Recreation & fitness facilities/1,000 pop, 2014
   </td>
   <td>RECFACPTH14
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>% White, 2010
   </td>
   <td>PCT_NHWHITE10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% Black, 2010
   </td>
   <td>PCT_NHBLACK10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% Hispanic, 2010
   </td>
   <td>PCT_HISP10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% Asian, 2010
   </td>
   <td>PCT_NHASIAN10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% American Indian or Alaska Native, 2010
   </td>
   <td>PCT_NHNA10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% Hawaiian or Pacific Islander, 2010
   </td>
   <td>PCT_NHPI10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% Population 65 years or older, 2010
   </td>
   <td>PCT_65OLDER10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>% Population under age 18, 2010
   </td>
   <td>PCT_18YOUNGER10
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>Median household income, 2015
   </td>
   <td>MEDHHINC15
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>Poverty rate, 2015
   </td>
   <td>POVRATE15
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>Metro/nonmetro counties, 2010
   </td>
   <td>METRO13
   </td>
   <td>Demographic
   </td>
  </tr>
  <tr>
   <td>FIPS
   </td>
   <td>
   </td>
   <td>Key
   </td>
  </tr>
  <tr>
   <td>State
   </td>
   <td>
   </td>
   <td>Key
   </td>
  </tr>
  <tr>
   <td>County
   </td>
   <td>
   </td>
   <td>Key
   </td>
  </tr>
</table>


Data to get separately:



*   CSA farms per county
*   ***Current diabetes and obesity rates per county
    *   By state obesity: [https://stateofobesity.org/states/ma/](https://stateofobesity.org/states/ma/)
    *   By county diabetes 2013: [https://www.cdc.gov/diabetes/atlas/countydata/atlas.html?detectflash=false](https://www.cdc.gov/diabetes/atlas/countydata/atlas.html?detectflash=false)  
*   More recent population data - race, income (current is from 2010 census)
    *   [https://statisticalatlas.com/state/Massachusetts/Race-and-Ethnicity#data-map/county](https://statisticalatlas.com/state/Massachusetts/Race-and-Ethnicity#data-map/county)
    *   [https://statisticalatlas.com/state/Massachusetts/Household-Income#data-map/county](https://statisticalatlas.com/state/Massachusetts/Household-Income#data-map/county)

Extra Data:

*   Food stamps by county in MA: [https://statisticalatlas.com/state/Massachusetts/Food-Stamps](https://statisticalatlas.com/state/Massachusetts/Food-Stamps)
*   Population by county in MA: [https://statisticalatlas.com/state/Massachusetts/Population](https://statisticalatlas.com/state/Massachusetts/Population)


# <a name="todo"></a>TODO/Current Status (updated 12/17/18)

([Trello Board](https://trello.com/invite/b/nV0Dk09z/14cb1550724df0a1790802d0c9cb6402/e14a-team-project) tracking progress)


## Finished:

- [X]   Presentation script
- [X]   Connect prediction calculator to data & backend
- [X]   Connect "Deep Dive" visualizations to map
- [X]   "Storytelling" prose & frontend polish
- [X]   Try to strengthen prediction model per recommended techniques from TAs
- [X]   Use Tableau to illustrate and build out the model
- [X]   Build (code) prediction calculator frontend
- [X]   Code out and populate the US map with data
- [X]   Explore Food Environment Atlas, USDA branded foods, and what we eat in America datasets - brainstorm predictors
- [X]   Finalize and organize predictors, datasets
- [X]   Scaffold basic US map (per county) in D3
- [X]   Plan/design D3 visualizations based on data findings
- [X]   Evaluate project proposal options: food distribution vs. MBTA
- [X]   Upload data to GH repo
- [X]   Organize Project Plan notes from meeting and add to GH repo
- [X]   Submit Project Plan on Canvas
- [X]   Scaffold basic web application
- [x]   Presentation recording
- [x]   README


# <a name="schema">Database Schema</a>

Table "food_atlas"

<table>
  <tr>
   <td>    	Column         
   </td>
   <td>          Type          
   </td>
   <td> Collation
   </td>
   <td> Nullable
   </td>
   <td>            	Default                 
   </td>
  </tr>
  <tr>
   <td> id                    
   </td>
   <td> integer                
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td> nextval('food_atlas_id_seq'::regclass)
   </td>
  </tr>
  <tr>
   <td> fips                  
   </td>
   <td> integer                
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> county                
   </td>
   <td> character varying(255)
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> state                 
   </td>
   <td> character varying(255)
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_pop15     
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_lowi15    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_hhnv15    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_snap15    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_child15   
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_seniors15
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_white15   
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_black15   
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_hisp15    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_nhasian15
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_nhna15    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_nhpi15    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_laccess_multir15  
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> grocpth14             
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> supercpth14           
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> convspth14            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> specspth14            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> snapspth16            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> ffrpth14              
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> fsrpth14              
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_snap16            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_nslp15            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_sbp15             
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pch_sfsp_09_15        
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_wic15             
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> sodatax_stores14      
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> sodatax_vendm14       
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> chipstax_stores14     
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> chipstax_vendm14      
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> food_tax14            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> fmrktpth16            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_snap16      
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_wic16       
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_wiccash16   
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_sfmnp16     
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_credit16    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_frveg16     
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_anmlprod16  
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_baked16     
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_fmrkt_otherfood16
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> foodhub16             
   </td>
   <td> integer                
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_diabetes_adults13
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_obese_adults13    
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_hspa15            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> recfacpth14           
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_nhwhite10         
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_nhblack10         
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_hisp10            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_nhasian10         
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_nhna10            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_nhpi10            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_65older10         
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> pct_18younger10       
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> medhhinc15            
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> povrate15             
   </td>
   <td> double precision       
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td> metro13               
   </td>
   <td> boolean                
   </td>
   <td>           
   </td>
   <td> not null
   </td>
   <td>
   </td>
  </tr>
</table>

## <a name="visualizations"></a>Frontend & Visualizations

- *US Map*: Takes [d3-geo](https://github.com/d3/d3-geo) map county and uses this to render choropleths based on selected Food Atlas data topics. This will be connected to the prediction calculator and deep dive graphs. As time permits, we may also explore the data as a bubble map using the same map object code.
- *Fast Food per 1000 & Obesity*: This is a scatterplot looking at the connection of the number of fast food restaurants per 1000/pop and percent of the population with low access to food (radius) to obesity. This chart will also be iterated on to include visual distinctions between metro and non metro counties. The goal is to give the user an understanding of demographics of a county that may influence the presence of fast food restaurants, and how that impacts the county's health.
- *Farmer's Markets per 1000 & Obesity:* This is a scatterplot looking at the number of Farmer's Markets per 1000/pop and obesity. The size of the circle radius reflects the percent of the population with low access to food sources.
- *Food Tax Rate & Obesity:*  This is a scatterplot looking at the food tax rate and obesity. The size of the circle radius reflects the percent of the population with low access to food sources.

## <a name="presentation"></a>Presentation
*Screencast Script*

### Overview:
Our project aims to derive insights about food access and attributes across the US by evaluating how those factors affect the health of a community. Our team is Tushal Desai, Rebecca Larson, Gabe Mansur, and Rachael Serur. 
We worked to solve the question, 'How can policy makers introduce policies that are the most effective at bettering the health of a county?'
This project is designed for policy makers to better understand what changes could make better the health of their county. There are many factors that influence the health of a community -- ranging from culture, income, food access, healthy food options, welfare programs, etc. Each county differs across these variables and therefore changing certain variables (for example, adding more grocery stores or reducing the number of fast food restaurants) affect the health of the county uniquely from others.
Our project allows policy makers to see a visual summary of the US according to these variables, both through a full map of all counties and three more linked visualizations that show deeper detail on specific veriables. The user can make further discoveries on a narrowed county level. By clicking on a county, the policy maker can use our Obesity Prediction Calculator to test how changing a couple variables can influence the health of that county. The three linked visualizations also update their context to show the policy maker only data from that county's state.
This application allows policy makers comprehensive insight into the trends and specifics of the country and each county and provides guidance in policies they should target to best help a specific county.

### Process:
To accomplish our goal, we used data from the USDA Food Environment Atlas. This dataset contains data at the county level and has many features, including access to restaurants, grocery stores, farmers markets and welfare programs, as well as demographic and health data. 

- looking through data
- EDA
- narrowing our scope and defining goal
- feature engineering and model creation
- map creation
- deep dive visualization creations
- prediction calculator creation
- putting it all together

### Demo:
- The different variables of the map
- Tooltips on counties 
- The bottom visualizations 
  - Brushing the first graphs filters the rest
  - tooltips
- Clicking on a county
- Use the prediction calculator
- See how the bottom visualizations filtered and the last one changed to be better suited to the data
- Reset the visualizations

### Challenges:
One of the most immediate challenges in this project was our dataset. After selecting features, we found that about half of our data had at least one null value in each county, so the entire county had to be dropped from the prediction model. Having all of the county data would have made our model more accurate and could show the user more accurate trends.
Another challenge was figuring out at what level our model should predict. We originally wanted to have separate models for each state with the understanding that there were many cultural factors not captured in the data, and were hoping to account for this by narrowing our focus to a state level. However, we only had county level data and most states have too few counties to build an accurate model around.

- there weren't really trends among features and response variable when did EDA, all a large bunch 

### Future Questions / Next Steps:
This first iteration of the Food Access Project helped bring the data to life and raise other questions that could be potentially answered by seeking ways to augment or further explore county data, such as: 

  - What other measures of health could we explore with this data? Exercise habits, diabetes, access to community recreational facilities or gyms? 
  - Can we drill into mediating factors that paint a clearer picture between obesity rates, farmer's markets, and fast food? Demographics such as socioeconomic status, race/ethnicity, and education levels are likely to play interesting roles.
  - When socioeconomic status does play a role, does increased access to food assistance programs at farmer's markets and grocery stores adequately help health rates in a community? The Food Atlas has data on Supplemental Nutrition Assistance Program (SNAP) acceptance, school programs, and Women, Infants, & Children (WIC) services that could shed light on program effectiveness and varying levels of access country-wide.
  - Are there datasets on legislature that could help further explain trends and help policymakers make data-driven decisions?

### Conclusion:
Overall, this project provides a good jumping off point to further investigate this idea of county-specific food policy. To have better accuracy, one would need more recent data with more relevant variables. The inaccuracy of this obesity prediction calculator also indicates that there are likely many factors that influence the health of a community that can't be perfectly captured by a number, such as culture, reinforcing that policy makers should not rely solely on data to introduce policy into a community. They should incorporate the voice of the community to have a fuller understanding and work with the community to find effective solutions.
