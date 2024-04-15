const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

const dataPromise = d3.json(url);

// This populates the dropdown button and intializes the functions
function init() {
    // #selDataset is html id for dropdown button
    let dropdownMenu = d3.select('#selDataset');
    // Call the optionChanged function when the dropdown value is changed
    d3.selectAll('#selDataset').on('change', optionChanged);

    dataPromise.then((data) => {
        // Return list of names
        let names = data.names;
        // Populates the options for the dropdown in the html
        names.forEach(name => {
            dropdownMenu.append('option')
                .property('value', name)
                .text(name);
        });
        let name = names[0];

        displayCharts(name);
        displayData(name);
        gaugeChart(name);
    });
}
// Display Charts
function displayCharts(id) {
    dataPromise.then((data) => {
        // Return samples for selected id
        let samples = data.samples.filter(result => result.id == id)[0];

        // Bar Chart -- Top 10 OTUs
        let barTrace = [{
            x: samples.sample_values.slice(0, 10).reverse(),
            y: samples.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: samples.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
        let barLayout = {
            title: `Top 10 OTUs for Test Subject ID No. ${id}`
        };
        // Bubble Chart -- All Samples
        let bubbleTrace = [{
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: 'markers',
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            }
        }];
        let bubbleLayout = {
            xaxis: { title: 'OTU ID' }
        };
        // Plot them Charts
        Plotly.newPlot('bar', barTrace, barLayout);
        Plotly.newPlot('bubble', bubbleTrace, bubbleLayout);
    });
}
// Display the sample metadata
function displayData(id) {
    // #sample-metadata is the html id for the text card 
    let displaySample = d3.select('#sample-metadata');

    dataPromise.then((data) => {
        // Return metadata for selected ID
        let metaData = data.metadata.filter(result => result.id == id)[0];

        // Return the metaData as key-value pairs
        let entries = Object.entries(metaData);

        // Clear out the text from previous search
        displaySample.text('');

        // Populate the text for the selected ID using forEach() loop
        entries.forEach(([key, value]) => {
            displaySample.append('ul').text(`${key}: ${value}`);
        });
    });
}
// Bonus -- Gauge Chart
function gaugeChart(id) {
    dataPromise.then((data) => {
        let metaData = data.metadata.filter(result => result.id == id)[0];

        let trace = [{
            type: 'indicator',
            mode: 'gauge+number',
            value: metaData.wfreq,
            title: `Test Subject ID No. ${id}<br>Belly Button Washing Frequency<br>Scrubs per Week`,
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, 1], color: '#FFCCE5' },
                    { range: [1, 2], color: '#FFCCFF' },
                    { range: [2, 3], color: '#E5CCFF' },
                    { range: [3, 4], color: '#CCCCFF' },
                    { range: [4, 5], color: '#CCE5FF' },
                    { range: [5, 6], color: '#CCFFFF' },
                    { range: [6, 7], color: '#CCFFE5' },
                    { range: [7, 8], color: '#CCFFCC' },
                    { range: [8, 9], color: '#E5FFCC' }
                ]
            }
        }];
        Plotly.newPlot('gauge', trace);
    });
}
// Update page when a new id is selected
function optionChanged(new_id) {
    displayCharts(new_id);
    displayData(new_id);
    gaugeChart(new_id);
}

init();





//This is stuff if we need to pull from the .json file
// Documentation: 'https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/'


// import data from '../../Resources/clean_all_states.json' assert { type: 'json'};
// console.log(data);
// URL for samples.json data

// fetch('../../Resources/clean_all_states.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));