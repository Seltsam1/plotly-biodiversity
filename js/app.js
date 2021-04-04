// Bioviversity dashboard

// initialized function (to load when page opens)
function init() {
    // Select dropdown element
    let selector = d3.select("#selDataset");
    // load data from sample.json
    d3.json("samples.json").then(function(data) {
        console.log(data);

        let namesData = data.names;
        console.log(namesData)
        namesData.forEach(function(names) {
            selector.append("option")
                .text(names)
                .property("value", names)
        });

        
    });

    
};

// call function init
init();

