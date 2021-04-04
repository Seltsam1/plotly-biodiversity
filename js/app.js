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


// function to create bar chart
function createChart(sample) {
    d3.json("samples.json").then(function(data) {
        let samples = data.samples;
        let dataArray = samples.filter(function(data) {
            return data.id === sample;
        });
        let otu_ids = dataArray[0].otu_ids;
        let otu_labels = dataArray[0].otu_labels;
        let sample_values = dataArray[0].sample_values;

        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
    });
};

// function to display metadata
// function createMetaData(sample) {
// }


// call function init
init();

