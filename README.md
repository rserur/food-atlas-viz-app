# Harvard CSCI E-14a Team Project

- [Project Plan](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/ProjectPlan.md)
- [Live Process Book](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/process_book.md)

## Team Members
- Tushal Desai
- Rebecca Larson
- Gabe Mansur
- Rachael Serur

## Milestone 1 - December 3rd, 2018
- [Python Notebook and EDA PDF](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/notebook_and_eda_120318.pdf)
- [Database Schema](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/process_book.md#schema)
- [12/3/18 Process Book PDF](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/process_book_120318.pdf)

## Milestone 2 - December 10th, 2018
- [Heroku-Deployed Prototype](https://csci-e14a-food-atlas.herokuapp.com/)
- [12/10/18 Process Book PDF](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/process_book_121018.pdf)
- [D3 Visualization Descriptions](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/process_book.md#frontend--visualizations)

## Milestone 3 - December 17th, 2018
- [Heroku App Link](https://csci-e14a-food-atlas.herokuapp.com/)
- [12/17/18 Process Book PDF](https://github.com/rserur/harvard-e14a-team-project/blob/master/supplemental_files/process_book_121718.pdf)
- [Screencast](https://youtu.be/C6i5LmWl6tQ)
- For code files:
  - The project code doesn't include any additional library files.
  - The data folder includes all our data files. 2018-usda-food-environment-atlas-dataset.xls is our original data file that we used and df_for_webapp.csv is our processed csv generated from the notebook. The data folder also includes the import_csv_to_db.py script to load the data from the csv to our database.
  - The notebooks folder includes our data exploration notebooks until the first milestone.
  - The supplemental_files folder includes our other notebooks after our first initial exploration. The rebecca_notebook.ipynb includes code to pre-process our data and export our chosen model for use in webapp.
  - The other files are for web app scaffolding and desired functionality.
- For the visualization:
  - The map visualization shows the existing data on tooltips and clicking on any county populates the prediction calculator with the existing values. The values can be altered for the calculator to predict the obesity rate (through our prediction model).
  - Selecting any county in the map also filters the 3 bottom visualizations to the State level.
  - We can use brush on the bottom left visualization of fast food on the US view to filter the data points in other two visualization on the right.
  - All the 3 bottom visualizations have tooltips to show the counties.
  - The food tax shows scatter plot for US but for the state level, since the food tax is same for the state, the visualization is switched to a histogram view. The food tax rate for the selected state is indicated in the label in the visualization.
  - The see all button below the map resets the bottom visualization to the country level if it shows the state level.
  - The reset button will reset the values in the prediction calculator and resets the visualizations below the US map.
  - The about button at the top gives more information about each visualization.
