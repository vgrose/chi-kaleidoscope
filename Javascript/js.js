// Set link
var link = "https://data.cityofchicago.org/resource/igwz-8jzy.geojson"

var ghostIcon = L.icon({
  iconUrl: "../Images/ghost-icon5.png",
  iconSize: [35,35],
  iconAnchor: [20,20],
});
var CPLIcon = L.icon({
  iconUrl: "../Images/pin.png",
  iconSize: [35,35],
  iconAnchor: [20,20],
});

var redLightIcon = L.icon({
  iconUrl: "../Images/rotating_light.png",
  iconSize: [30,30],
  iconAnchor: [20,20]
});

var pizzaIcon = L.icon({
  iconUrl: "../Images/pizzaIcon.png",
  iconSize: [50,50],
  iconAnchor: [20,20]
});

var tacoIcon = L.icon({
  iconUrl: "../Images/tacoIcon.png",
  iconSize: [30,30],
  iconAnchor: [20,20]
});

//Function that will determine the color of a Chicago neighborhood based on the area it belongs to
function chooseColor(community) {
  switch (community) {
    // "Far North Side"
    case "OHARE":
      return "darkgreen";
    case "EDISON PARK":
      return "darkgreen";
    case "NORWOOD PARK":
      return "darkgreen";
    case "JEFFERSON PARK":
      return "darkgreen";
    case "FOREST GLEN": 
      return "darkgreen";
    case "NORTH PARK":  
      return "darkgreen";
    case "ALBANY PARK":
      return "darkgreen";
    case "WEST RIDGE":  
      return "darkgreen";
    case "LINCOLN SQUARE":
      return "darkgreen";
    case "ROGERS PARK": 
      return "darkgreen";
    case "EDGEWATER":
      return "darkgreen";
    case "UPTOWN":
      return "darkgreen";
    // "North Side"
    case "AVONDALE":
      return "cyan";
    case "LAKE VIEW":
      return "cyan";
    case "LINCOLN PARK":
      return "cyan";
    case "LOGAN SQUARE":
      return "cyan";
    case "NORTH CENTER": 
      return "cyan";
    // "Northwest Side"
    case "BELMONT CRAGIN":
      return "darkslateblue";
    case "DUNNING":
      return "darkslateblue";
    case "HERMOSA":
      return "darkslateblue";
    case "IRVING PARK":
      return "darkslateblue";
    case "MONTCLARE": 
      return "darkslateblue";
    case "PORTAGE PARK":
      return "darkslateblue";
    //"West Side"
    case "AUSTIN":
      return "red";
    case "HUMBOLDT PARK":
      return "red";
    case "WEST TOWN":
      return "red";
    case "WEST GARFIELD PARK":
      return "red";
    case "EAST GARFIELD PARK": 
      return "red";
    case "NEAR WEST SIDE":
      return "red";
    case "NORTH LAWNDALE":
      return "red";
    case "SOUTH LAWNDALE":
      return "red";
    case "LOWER WEST SIDE":
      return "red"; 
    // "Central"
    case "NEAR NORTH SIDE":
      return "fuchsia";
    case "LOOP":
      return "fuchsia";
    case "NEAR SOUTH SIDE":
      return "fuchsia";
    // "Southwest Side"
    case "GARFIELD RIDGE":
        return "orange";
    case "CLEARING":
        return "darkorange";
    case "ARCHER HEIGHTS":
        return "darkorange";
    case "WEST ELSDON":
        return "darkorange";
    case "WEST LAWN": 
        return "darkorange";
    case "BRIGHTON PARK":
        return "darkorange";
    case "GAGE PARK":
        return "darkorange";
    case "CHICAGO LAWN":
        return "darkorange";
    case "MCKINLEY PARK":
        return "darkorange"; 
    case "NEW CITY":
        return "darkorange";
    case "WEST ENGLEWOOD":
        return "darkorange";
    case "ENGLEWOOD":
        return "darkorange"; 
    // "South Side"
    case "BRIDGEPORT":
        return "yellow";
    case "ARMOUR SQUARE":
        return "yellow";
    case "DOUGLAS":
        return "yellow";
    case "OAKLAND":
        return "yellow";
    case "GRAND BOULEVARD": 
        return "yellow";
    case "FULLER PARK":
        return "yellow";
    case "WASHINGTON PARK":
        return "yellow";
    case "HYDE PARK":
        return "yellow";
    case "WOODLAWN":
        return "yellow"; 
    case "GREATER GRAND CROSSING":
        return "yellow";
    case "SOUTH SHORE":
        return "yellow";
    case "KENWOOD":
        return "yellow"; 
    // "Far Southwest Side"
    case "ASHBURN":
        return "green";
    case "AUBURN GRESHAM":
        return "green";
    case "BEVERLY":
        return "green";
    case "WASHINGTON HEIGHTS":
        return "green";
    case "MOUNT GREENWOOD": 
        return "green";
    case "MORGAN PARK":
        return "green";
    // "Far Southwest Side"
    case "CHATHAM":
        return "cadetblue";
    case "AVALON PARK":
        return "cadetblue";
    case "SOUTH CHICAGO":
        return "cadetblue";
    case "CALUMET HEIGHTS":
        return "cadetblue";
    case "BURNSIDE": 
        return "cadetblue";
    case "ROSELAND":
        return "cadetblue";
    case "WEST PULLMAN":
        return "cadetblue";
    case "RIVERDALE":
        return "cadetblue";
    case "PULLMAN":
        return "cadetblue"; 
    case "SOUTH DEERING":
        return "cadetblue";
    case "EAST SIDE":
        return "cadetblue";
    case "HEGEWISCH":
        return "cadetblue";

  default:
    return "grey";
  }
};

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  //Test print
  console.log(data.features[1].properties.community);
  // Call createFeatures function defined below
  createFeatures(data.features);
});

// Define createFeatures function
function createFeatures (neighborhoodData) {
  // Define neighborhood layer
  var neighborhoods = L.geoJson(neighborhoodData, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.community),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            strokeweight: 2,
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        //FYI right now I can't get this feature to work tbd
        // click: function(event) {
        //   map.fitBounds(event.target.getBounds());
        // }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.community + "</h1> <hr> <h2>" + feature.properties.community + "</h2>");
    }
  });
  // Call createMap function defined below
  createMap(neighborhoods);
};

var hauntedMarkers = [];
d3.csv("../Datasets/haunted.csv", function(error, hauntedData) {
  
  if (error) return console.warn(error);

  // Cast each hours value in tvData as a number using the unary + operator
  hauntedData.forEach(function(data) {

    lat = data.Latitude;
    lng = data.Longitude;
    hauntedMarkers.push(
      L.marker([lat, lng], {icon: ghostIcon}).bindPopup("<h3>" + data.Blurb + "</h3>"));
  });
});

console.log(hauntedMarkers);

var redMarkers = [];
d3.csv("../Datasets/red-light-camera-locations.csv", function (error, red) {

  if (error) return console.warn(error);

  red.forEach(function (d) {
    lat = d.LATITUDE;
    lng = d.LONGITUDE;
    redMarkers.push(
      L.marker([lat, lng], {icon: redLightIcon}).bindPopup("<h3>" + d.INTERSECTION + "</h3>"))

  });

});
console.log(redMarkers);

var CPLMarkers = [];
// d3.csv('CPLdata1.csv', function(data) {
// console.log(data)
// })
d3.csv("../Datasets/CPLdata1.csv", function(data) {
  console.log(data);

  // Cast each hours value in tvData as a number using the unary + operator
  data.forEach(function(d) {

    lat = d.Latitude;
    lng = d.Longitude;
    CPLMarkers.push(
      L.marker([lat, lng], {icon: CPLIcon}).bindPopup("<h3 align = 'center'>" + d.Name + "</h3><h4 align = 'center'>" + d.Hours+ "<br></br>"+ d.Phone + "<br></br>"+ d.Address + "<br></br><a href="+ d.Website+" target = '_blank'>" +`Website`+"</a></h4>"));
  });
});

var pizzaHeatArray = [];
var pizzaClusterMarkers = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    var count = cluster.getChildCount();
    console.log(count);
    return L.divIcon({ 
      className: 'my-div-icon',
      html: `<div id = "pizzaContainer">
                <img id ="tacoImage" src = "../Images/pizzaIcon.png" style="width:100%;"/>
                <p id ="tacoText">${count}</p>
            </div>`
    });
  }
});

d3.csv("../Datasets/pizzaUpdate.csv", function(error, pizzaData) {
  
    if (error) return console.warn(error);

  // Cast each hours value in tvData as a number using the unary + operator
    pizzaData.forEach(function(data) {

        var lat = data.Latitude;
        var lng = data.Longitude;
        // pizzaHeatArray.push([lat, lng]);
        pizzaClusterMarkers.addLayer(L.marker([lat, lng], {icon: pizzaIcon})
        .bindPopup("<h3 align = 'center'>" + data.Name + "</h3><h4 align = 'center'>" + data.Address + "</h4"));
    });
  });


var mexicanHeatArray = [];
var mexicanClusterMarkers = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    var count = cluster.getChildCount();
    console.log(count);
    return L.divIcon({ 
      className: 'my-div-icon',
      html: `<div id = "tacoContainer">
                <img id ="tacoImage" src = "../Images/tacoIcon.png" style="width:100%;"/>
                <p id ="tacoText">${count}</p>
            </div>`
    });
  }
});
 d3.csv("../Datasets/mexicanUpdate.csv", function(error, mexicanData) {
    
    if (error) return console.warn(error);
  
    // Cast each hours value in tvData as a number using the unary + operator
    mexicanData.forEach(function(data) {
      var lat = data.Latitude;
          var lng = data.Longitude;
          // pizzaHeatArray.push([lat, lng]);
          mexicanClusterMarkers.addLayer(L.marker([lat, lng], {icon: tacoIcon})
          .bindPopup("<h3 align = 'center'>" + data.Name + "</h3><h4 align = 'center'>" + data.Address + "</h4"));
      });
    });

//Define createMap function
function createMap(neighborhoods) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var hauntedLayer = L.layerGroup(hauntedMarkers);
  var redLayer = L.layerGroup(redMarkers);
  var CPLLayer = L.layerGroup(CPLMarkers);

  var CTALayer = L.gridLayer.googleMutant({
    type: 'terrain',
    styles: [
      
      {featureType: 'transit.station'},
      {featureType: 'transit.line'}
    ]
  
  });
  CTALayer.addGoogleLayer('TransitLayer');
//   var pizzaHeat = L.heatLayer(pizzaHeatArray, {
//     radius: 20,
//     blur: 35
// });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    CTA: CTALayer,
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Neighborhoods: neighborhoods,
    Ghosts: hauntedLayer,
    Libraries: CPLLayer,
    "Red Light Cameras": redLayer,
    // "Pizza heat": pizzaHeat,
    Pizza: pizzaClusterMarkers,
    Mexican: mexicanClusterMarkers
  };

  // Create our map, giving it the streetmap and neighborhood layers to display on load
  var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 11,
    layers: [streetmap, neighborhoods]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}