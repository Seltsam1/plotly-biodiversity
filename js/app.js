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
    });
};

// function to display metadata
// function createMetaData(sample) {
// }


// call function init
init();

