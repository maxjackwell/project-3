// This imports the data from the json file, unfortunately it doens't like the clean_all_states.json file
const json_data = d3.json('../../Resources/full_nba.json');

// Call the json data from the .json file
json_data.then((data) => {
    console.log(data);
})

// This populates the dropdown button and intializes the functions
function init() {
    // #selDataset is html id for dropdown button
    let dropdownMenu = d3.select('#selDataset');
    // Call the optionChanged function when the dropdown value is changed
    d3.selectAll('#selDataset').on('change', optionChanged);



        // Return list of states
        let states = ['AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY'
        ,'LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK'
        ,'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

        // Populates the options for the dropdown in the html
        states.forEach(name => {
            dropdownMenu.append('option')
                .property('value', name)
                .text(name);
        });
        let state = states[0];
        console.log(state)

    ;
}
// Update page when a new id is selected
function optionChanged(new_id) {
    console.log(new_id)

}
init();