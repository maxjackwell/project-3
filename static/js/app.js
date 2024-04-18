// Return list of states
const states = [
    'ALL STATES','AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let state_data, ten_list, header_list, stat_list;


// #selDataset is html id for dropdown button
let dropdownMenu = d3.select('#selDataset');

// #sample-metadata is the html id for the text card 
let displaySample = d3.select('#sample-metadata');
// displaySample.select('div', '#div-to-remove').remove();

let displayCities = d3.select('#top-cities');

let topTenChart = d3.select('#table');


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
    topFiveCities(state)
    topTenCharts(state)
}
// Display the sample metadata
function displayData(state_abbrev) {

    // Clear the previous search results
    // displaySample.html('');

    console.log('after clear search')
    console.log(state_abbrev)


    json_data.then((data) => {
        if (state_abbrev != 'ALL STATES') {
            state_data = data.filter(result => result.state == state_abbrev);
        console.log(state_data)
        console.log('right before problem')
        }
        else {
            state_data = data;
        }
        // Return metadata for selected ID
        
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
        console.log(top_gp, top_pts, top_reb, top_assists, top_blocks,  top_stl, top_fg, top_fga, top_3p, top_3pa, top_ft, top_fta, top_to, top_pf);

        displaySample.append('div').attr('id', 'div-to-remove').html(`
                <ul class="list-group-item list-group-item-success"><em>Games</em>: <b>${top_gp.gp.toLocaleString()}<br><a href=${top_gp.url}>${top_gp.name}</a></b><br><small>(${top_gp.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Points</em>: <b>${top_pts.pts.toLocaleString()}<br><a href=${top_pts.url}>${top_pts.name}</a></b><br><small>(${top_pts.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Rebounds</em>: <b>${top_reb.trb.toLocaleString()}<br><a href=${top_reb.url}>${top_reb.name}</a></b><br><small>(${top_reb.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Assists</em>: <b>${top_assists.ast.toLocaleString()}<br><a href=${top_assists.url}>${top_assists.name}</a></b><br><small>(${top_assists.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Blocks</em>: <b>${top_blocks.blk.toLocaleString()}<br><a href=${top_blocks.url}>${top_blocks.name}</a></b><br><small>(${top_blocks.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Steals</em>: <b>${top_stl.stl.toLocaleString()}<br><a href=${top_stl.url}>${top_stl.name}</a></b><br><small>(${top_stl.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>FG Makes</em>: <b>${top_fg.fg.toLocaleString()}<br><a href=${top_fg.url}>${top_fg.name}</a></b><br><small>(${top_fg.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>FG Attempts</em>: <b>${top_fga.fga.toLocaleString()}<br><a href=${top_fga.url}>${top_fga.name}</a></b><br><small>(${top_fga.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>3pt Makes</em>: <b>${top_3p.threep.toLocaleString()}<br><a href=${top_3p.url}>${top_3p.name}</a></b><br><small>(${top_3p.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>3pt Attempts</em>: <b>${top_3pa.threepa.toLocaleString()}<br><a href=${top_3pa.url}>${top_3pa.name}</a></b><br><small>(${top_3pa.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>FT Makes</em>: <b>${top_ft.ft.toLocaleString()}<br><a href=${top_ft.url}>${top_ft.name}</a></b><br><small>(${top_ft.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>FT Attempts</em>: <b>${top_fta.fta.toLocaleString()}<br><a href=${top_fta.url}>${top_fta.name}</a></b><br><small>(${top_fta.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Turnovers</em>: <b>${top_to.to.toLocaleString()}<br><a href=${top_to.url}>${top_to.name}</a></b><br><small>(${top_to.city.replace('_',' ')})</small></ul>
                <ul class="list-group-item list-group-item-success"><em>Personal Fouls</em>: <b>${top_pf.pf.toLocaleString()}<br><a href=${top_pf.url}>${top_pf.name}</a></b><br><small>(${top_pf.city.replace('_',' ')})</small></ul>
                
                
        `);    
         console.log('displaysamplechangedpt2')




    });
}



// TOp 10 In each Stat per State
function topTenCharts(state_abbrev) {

    json_data.then((data) =>{
        if (state_abbrev != 'ALL STATES') {
            state_data = data.filter(result => result.state == state_abbrev);
        console.log(state_data)
        console.log('right before ten list problem')
        }
        else {
            console.log('All states selected')
            state_data = data;
        }
        let ten_gp = state_data.sort((a, b) => d3.descending(a.gp, b.gp)).slice(0,10);
        let ten_pts = state_data.sort((a, b) => d3.descending(a.pts, b.pts)).slice(0,10);
        let ten_reb = state_data.sort((a,b)=> d3.descending(a.trb, b.trb)).slice(0,10);
        let ten_assists = state_data.sort((a, b) => d3.descending(a.ast, b.ast)).slice(0,10);
        let ten_blocks = state_data.sort((a, b) => d3.descending(a.blk, b.blk)).slice(0,10);
        let ten_stl = state_data.sort((a, b) => d3.descending(a.stl, b.stl)).slice(0,10);
        let ten_fg = state_data.sort((a, b) => d3.descending(a.fg, b.fg)).slice(0,10);
        let ten_fga = state_data.sort((a, b) => d3.descending(a.fga, b.fga)).slice(0,10);
        let ten_3p = state_data.sort((a, b) => d3.descending(a.threep, b.threep)).slice(0,10);
        let ten_3pa = state_data.sort((a, b) => d3.descending(a.threepa, b.threepa)).slice(0,10);
        let ten_ft = state_data.sort((a, b) => d3.descending(a.ft, b.ft)).slice(0,10);
        let ten_fta = state_data.sort((a, b) => d3.descending(a.fta, b.fta)).slice(0,10);
        let ten_to = state_data.sort((a, b) => d3.descending(a.to, b.to)).slice(0,10);
        let ten_pf = state_data.sort((a, b) => d3.descending(a.pf, b.pf)).slice(0,10);
        console.log(ten_gp, ten_pts, ten_reb, ten_assists, ten_blocks,  ten_stl, ten_fg, ten_fga, ten_3p, ten_3pa, ten_ft, ten_fta, ten_to, ten_pf);
        ten_list = [ten_gp, ten_pts, ten_reb, ten_assists, ten_blocks,  ten_stl, ten_fg, ten_fga, ten_3p, ten_3pa, ten_ft, ten_fta, ten_to, ten_pf]
        header_list = ['Games Played', 'Points', 'Rebounds', 'Assists', 'Blocks', 'Steals', 'FG Made', 'FG Attempts', '3P Made', '3P Attempt', 'FT Made', 'FT Attempts', 'Turnovers', 'Personal Fouls']
        stat_list = ['gp', 'pts', 'trb', 'ast', 'blk', 'stl', 'fg', 'fga', 'threep', 'threepa', 'ft', 'fta', 'to', 'pf']

        for (i=0; i < ten_list.length; i++) {
            topTenChart.append('div').text(header_list[i]).attr("class", "card mn-auto card bg-light mb-3").attr("id", `${stat_list[i]}-list`).attr("style", "width: 4%;")
            let stats_list = d3.select(`#${stat_list[i]}-list`)
            for (j=0; j < ten_list[i].length; j++) {

                stats_list.append('a').text(`${j+1}. ${ten_list[i][j].name}: ${ten_list[i][j][stat_list[i]].toLocaleString()}`).attr("href", ten_list[i][j].url)

                }

            
            };
        });

    }


// in Init 
// Top five cities
function topFiveCities(state_abbrev) {
    json_data.then((data) => {
        if (state_abbrev != 'ALL STATES') {
            state_data = data.filter(result => result.state == state_abbrev);
        console.log(state_data)
        console.log('right before problem')
        }
        else {
            state_data = data;
        }
        city_count = d3.group(state_data, d => d.city)
        console.log(city_count)
        // city_count_sort = Array.from(city_count)
        top_cities = d3.sort(city_count, (a,b) => d3.descending(a[1], b[1]))
        top_five_cities = Array.from(top_cities).slice(0,5);
        console.log(top_five_cities)

        for (i= 0; i < top_five_cities.length; i++) {
            displayCities.append('ul').text(`${i+1}. ${top_five_cities[i][0].replace('_', ' ')} (${top_five_cities[i][1].length}) `)
        }

    })
}

// Update page when a new id is selected
function optionChanged(new_state) {


    if (new_state instanceof Event) {

    }
    else{
        displaySample.html('');
        displayCities.html('');
        topTenChart.html('');
        displayData(new_state);
        topFiveCities(new_state);
        topTenCharts(new_state);

    }

}
console.log('Go Team')
console.log('Go Team')
init();
