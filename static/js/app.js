// Return list of states
const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
// #selDataset is html id for dropdown button
let dropdownMenu = d3.select('#selDataset');

// #sample-metadata is the html id for the text card 
let displaySample = d3.select('#sample-metadata');
// displaySample.select('div', '#div-to-remove').remove();





const json_data = d3.json('../../Resources/full_states_nba.json');


// Call the json data from the .json file
json_data.then((data) => {
    console.log(data);
})

// This populates the dropdown button and intializes the functions
function init() {

    
    // Call the optionChanged function when the dropdown value is changed
    d3.selectAll('#selDataset').on('change', optionChanged);

    // Populates the options for the dropdown in the html
    states.forEach(state_abbrev => {
        dropdownMenu.append('option')
            .property('value', state_abbrev)
            .text(state_abbrev);
    });
    let state = states[0];

    displayData(state)
}

// Display the sample metadata
function displayData(state_abbrev) {

    // Clear the previous search results
    displaySample.html('');

    console.log('jackattack')
    console.log(state_abbrev)


    json_data.then((data) => {

        // Return metadata for selected ID
        let state_data = data.filter(result => result.state == state_abbrev);
        console.log(state_data)
        console.log('right before problem')



        let top_gp = state_data.sort((a, b) => d3.descending(a.gp, b.gp))[0];
        let top_pts = state_data.sort((a, b) => d3.descending(a.pts, b.pts))[0];
        let top_reb = state_data.sort((a,b)=> d3.descending(a.trb, b.trb))[0];
        let top_assists = state_data.sort((a, b) => d3.descending(a.ast, b.ast))[0];
        let top_blocks = state_data.sort((a, b) => d3.descending(a.blk, b.blk))[0];
        let top_stl = state_data.sort((a, b) => d3.descending(a.stl, b.stl))[0];
        let top_fg = state_data.sort((a, b) => d3.descending(a.fg, b.fg))[0];
        let top_fga = state_data.sort((a, b) => d3.descending(a.fga, b.fga))[0];
        let top_3p = state_data.sort((a, b) => d3.descending(a.threep, b.threep))[0];
        let top_3pa = state_data.sort((a, b) => d3.descending(a.threepa, b.threepa))[0];
        let top_ft = state_data.sort((a, b) => d3.descending(a.ft, b.ft))[0];
        let top_fta = state_data.sort((a, b) => d3.descending(a.fta, b.fta))[0];
        let top_to = state_data.sort((a, b) => d3.descending(a.to, b.to))[0];
        let top_pf = state_data.sort((a, b) => d3.descending(a.pf, b.pf))[0];
        console.log(top_gp, top_pts, top_blocks, top_assists, top_fg, top_fga, top_pf);



        // displaySample.append('ul')
        //                 .text(`Games: ${top_gp.gp} ${top_gp.name} (${top_gp.city.replace('_',' ')})`);
        // displaySample.append('ul')
        //                 .text(`Points: ${top_pts.pts} ${top_pts.name} (${top_pts.city.replace('_',' ')})`);
        // displaySample.append('ul')
        //                 .text(`Blocks: ${top_blocks.blk} ${top_blocks.name} (${top_blocks.city.replace('_',' ')})`);
        // displaySample.append('ul')
        //                 .text(`Assists: ${top_assists.ast} ${top_assists.name} (${top_assists.city.replace('_',' ')})`);
        // displaySample.append('ul')
        //                 .text(`FG Makes: ${top_fg.fg} ${top_fg.name} (${top_fg.city.replace('_',' ')})`);
        // displaySample.append('ul')
        //                 .text(`FG Attempts: ${top_fga.fga} ${top_fga.name} (${top_fga.city.replace('_',' ')})`);
        // displaySample.append('ul')
        //                 .text(`Fouls: ${top_pf.pf} ${top_pf.name} (${top_pf.city.replace('_',' ')})`);
        displaySample.append('div').attr('id', 'div-to-remove').html(`
                <ul><em>Games</em>: <b>${top_gp.gp}  ${top_gp.name}</b> <small>(${top_gp.city.replace('_',' ')})</small></ul>
                <ul><em>Points</em>: <b>${top_pts.pts}  ${top_pts.name}</b> <small>(${top_pts.city.replace('_',' ')})</small></ul>
                <ul><em>Rebounds</em>: <b>${top_reb.gp}  ${top_reb.name}</b> <small>(${top_reb.city.replace('_',' ')})</small></ul>
                <ul><em>Assists</em>: <b>${top_assists.pts}  ${top_assists.name}</b> <small>(${top_assists.city.replace('_',' ')})</small></ul>
                <ul><em>Blocks</em>: <b>${top_blocks.pts}  ${top_blocks.name}</b> <small>(${top_blocks.city.replace('_',' ')})</small></ul>
                <ul><em>Steals</em>: <b>${top_stl.pts}  ${top_stl.name}</b> <small>(${top_stl.city.replace('_',' ')})</small></ul>
                <ul><em>FG Makes</em>: <b>${top_fg.pts}  ${top_fg.name}</b> <small>(${top_fg.city.replace('_',' ')})</small></ul>
                <ul><em>FG Attempts</em>: <b>${top_fga.pts}  ${top_fga.name}</b> <small>(${top_fga.city.replace('_',' ')})</small></ul>
                <ul><em>3pt Makes</em>: <b>${top_3p.pts}  ${top_3p.name}</b> <small>(${top_3p.city.replace('_',' ')})</small></ul>
                <ul><em>3pt Attempts</em>: <b>${top_3pa.pts}  ${top_3pa.name}</b> <small>(${top_3pa.city.replace('_',' ')})</small></ul>
                <ul><em>FT Makes</em>: <b>${top_ft.gp}  ${top_ft.name}</b> <small>(${top_ft.city.replace('_',' ')})</small></ul>
                <ul><em>FT Attempts</em>: <b>${top_fta.pts}  ${top_fta.name}</b> <small>(${top_fta.city.replace('_',' ')})</small></ul>
                <ul><em>Turnovers</em>: <b>${top_to.pts}  ${top_to.name}</b> <small>(${top_to.city.replace('_',' ')})</small></ul>
                <ul><em>Personal Fouls</em>: <b>${top_pf.pts}  ${top_pf.name}</b> <small>(${top_pf.city.replace('_',' ')})</small></ul>

                
        `);    
         console.log('displaysamplechangedpt2')

    });
}
// Update page when a new id is selected
function optionChanged(new_state) {

    
    
    console.log(new_state);
    console.log('Option changed')
    displayData(new_state);

}


init();
