// Bioviversity dashboard

// initialized function (to load when page opens)
function init() {
    // Select dropdown element
    let selector = d3.select("#selDataset");
    // load data from sample.json
    d3.json("samples.json").then(function(data) {
        console.log(data);

        let namesData = data.names;
        namesData.forEach(function(names) {
            selector.append("option")
                .text(names)
                .property("value", names)
        });

        let firstSample = namesData[0];

        // call functions to build charts and demographic info
        createChart(firstSample);
        createMetaData(firstSample);
      //  createGauge(firstSample);
    });
};


// function to create charts
function createChart(sample) {
    d3.json("samples.json").then(function(data) {
        let samples = data.samples;

        let dataArray = samples.filter(function(data) {
            return data.id === sample;
        });
        let otu_ids = dataArray[0].otu_ids;
        let otu_labels = dataArray[0].otu_labels;
        let sample_values = dataArray[0].sample_values;

        // for bubble chart
        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Electric"
            }
        }];

        let bubbleLayout = {
            title: `Bacteria Cultures for Subject ${sample}`,
            hovermode: "closest",
            xaxis: {
                title: "OTU (Operational Taxonomic Unit) ID"
            },
            margin: {t: 30}
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // for bar chart
        let yticks = otu_ids.slice(0,10).map(function(otuID) {
            return `OTU ${otuID}`;
        }).reverse();

        let barData = [{
            y: yticks,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: "4B0082"
            }
        }];
        let barLayout = {
            title: `Top 10 Cultures for ID ${sample}`,
            margin: {
                t: 30,
                l: 150
            }
        };
        Plotly.newPlot("bar", barData, barLayout)
    });
};

// function to display metadata in demographic panel
function createMetaData(sample) {
    d3.json("samples.json").then(function(data) {
        let metadata = data.metadata;
        let resultsArray = metadata.filter(function(data) {
            return data.id == sample;
        });
        let result = resultsArray[0];
        let panel = d3.select("#sample-metadata");

        // reset exisisting metadata
        panel.html("");
        
        // // loop through each object and append data to panel
        Object.entries(result).forEach(function([key, value]) {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        });        
    });
};

// function to change data based on user option from dropdown menu
function optionChanged(sample) {
    createChart(sample);
    createMetaData(sample);
   // createGauge(sample)
};

// // BONUS - guage chart
// function createGauge(sample) {
//     d3.json("samples.json").then(function(data) {
//         let metadata = data.metadata;
//         let resultsArray = metadata.filter(function(data) {
//             return data.id == sample;
//         });
//         // calculations to determine angle of guage chart
//         let result = resultsArray[0].wfreq;
//         let value = parseFloat(result) * 20;
//         let degrees = 180 - value;
//         let radius = 0.5;
//         let radians = (degrees * Math.PI) / 180;
//         let x = radius * Math.cos(radians);
//         let y = radius * Math.cos(radians);
//         let mainPath = "M -.0 -0.05 L .0 0.05 L";
//         let pathX = String(x);
//         let space = " ";
//         let pathY = String(y);
//         let pathEnd = " Z";
//         let path = mainPath.concat(pathX, space, pathY, pathEnd);

//         // create guage chart based on path
//         let gaugeData = [{
//             type: "scatter",
//             x: [0],
//             y: [0],
//             marker: {
//                 size: 12,
//                 color: "850000"
//             },
//             showLegend: false,
//             name: "Freq",
//             text: value,
//             hoverinfo: "text+name"
//             },
//             {values: [(50 / 9), (50 / 9), (50 / 9), (50 / 9),
//                 (50 / 9), (50 / 9), (50 / 9), (50 / 9),
//                 (50 / 9), (50 / 9)],
//             rotation: 90,
//             text: ["8-9", "7-8", "6-7", "5-6",
//                    "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//             textinfo: "text",
//             textposition: "inside",
//             markers: {
//                 colorscale: "Electric"
//             },
//             labels: ["8-9", "7-8", "6-7", "5-6",
//                    "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//             hoverinfo: "label",
//             hole: 0.5,
//             type: "pie",
//             showlegend: false
//         }
//     ];
//     var gaugeLayout = {
//         shape: [
//             {
//                 type: "path",
//                 path: path,
//                 fillcolor: "c8a2c8",
//                 line: {
//                     color: "c8a2c8"
//                 }
//             }
//         ],
//         title: "<b>Belly Button Washing Frequency</b> <br> Scrub per Week",
//         height: 500,
//         width: 500,
//         xaxis: {
//             zeroline: false,
//             showticklabels: false,
//             shpwgrid: false,
//             range: [-1,1]
//         },
//         yaxis: {
//             zeroline: false,
//             showticklabels: false,
//             shpwgrid: false,
//             range: [-1,1]
//         }
//     }
//     let GAUGE = document.getElementById("guage");
//     Plotly.newPlot(GAUGE, guageData, gaugeLayout)

//     });
    
// };

// call function init
init();

