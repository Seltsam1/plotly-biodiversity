# plotly-biodiversity
Interactive dashboard of belly button biodiversity using plotly

## Getting Started

This project contains files to create an interactive dashboard on a website using HTML, javascript, and plotly

Data from this project is available here: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/

Data based on: Hulcr, J. et al.(2012) "A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable"

Download folder structure to get started. See details in Features section

## Features

- index.html
  - Includes basic layout for website
  - Utilizes scripts from bootstrap, d3.js, and plotly
  - Utilizes custom scripts for javascript and json data

- samples.json
  - Dictionary data in json format
  - See link in Getting Started section for original
 
 - js/app.js
  - Provides main functionality for website
  - reads in json data using d3
  - Provides functions to build charts based on the subject ID selected by user in dropdown menu
    - createChart function builds a bubble chart and a horizontal bar chart
    - createMetaData function fills in the panel with metadata based on Subject ID
  - Includes commented out data for an additional chart that was not included in final dashboard 

## Licensing by:

The code in this project is licensed under MIT license.
