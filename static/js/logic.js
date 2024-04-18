let url = 'https://maxjackwell.github.io/project-3/Resources/full_states_nba.json'
const json_mapdata = d3.json(url); 

function createMap(players){
    let map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    
    var baseMaps = {
            "Map": map
        };
    var overlayMaps = {
            "Players": players
        };
    var myMap = L.map("bubble", {
        center: [39.81, -98.56],
        zoom: 3.5,
        layers: [map, players]
    });
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
}
function initMap(){
    json_mapdata.then((data) => {
        let playerMarkers = [];
            for (let index = 0; index < data.length; index++) {
                let one_player = data[index];
                let player_marker = L.circle([one_player.lat, one_player.lon],{
                    radius: 10
                }).bindPopup(`<h1>${one_player.city.replace('_',' ')}, ${one_player.state}</h1> <hr> <h3> Name : <a href=${one_player.url}> ${one_player.name} </a>
                `);
                playerMarkers.push(player_marker);
            }
            let players = L.layerGroup(playerMarkers)
            createMap(players);
    })
}
initMap();