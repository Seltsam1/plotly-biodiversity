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

        createChart(firstSample)
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
            orientation: "h"
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

// function to display metadata
function createMetaData(sample) {
    d3.json("samples.json").then(function(data) {
        let metaData = data.metadata;
        let resultsArray = metaData.filter(function(data) {
            return data.id === sample;
        });
        let result = resultsArray[0];
        let panel = d3.select("#sample-metadata");

        // reset exisisting metadata
        panel.html("");
        
        // loop through each object
        Object.defineProperties(result).forEach(function([key, value]){
            console.log(key, value)
        })

    })
}


// call function init
init();

