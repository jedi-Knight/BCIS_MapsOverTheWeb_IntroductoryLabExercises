//first of all let's set our goal:
// 1. make an empty map, more like a container for vector and raster, center it over Baneshwor,
// 2. fetch map tiles and add them to make the map's base layer,
// 3. set map view such that the map is centered over Baneshwor and streets can be seen,
// 4. draw colleges in the area as a vector layer,
// 5. make the vector layers clickable so that a popup box with information appears when user clicks on it with a mouse
// 6. give custom styling to vector layers
// you can find a similar example at leaflet.com/examples/quick-start.html,
// and more examples at leaflet.com/examples


//lets do it one step at a time..

//we need a map, we need raster tiles as base layer, we need vectors that have infomation attached to them,
//so lets declare variables to store each of these..
var map, osmTiles, vectorsFromGeojson;

//now lets initialize the map
map = L.map("map");

//initialize the tile layer (basemap layer)..the function on the right takes parameters that tell it where to fetch the map tiles from,
//wether to add an attribution or copyright info about the map tiles..we'll talk about the other parameters later,
//or you can also look them up yourselves at leaflet.com/reference.html
osmTiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
        });

//npw that the map variable knows it's a map, the tile variable knows its a base layer,
//lets add the base layer to the map
map.addLayer(osmTiles);

//now we want to set the map view to Baneshwor at such a zoom level that streets can be clearly seen..
map.setView([27.69877,85.337941], 15);

//now we fetch the geojson data that will be used to draw our interactive vector layer..
//we use jquery.getJSON for this..

 //but wait..first of all, lets create a function that draws the vector layers on the map
 //once jquery fetches the geojson file from our web server and assigns its contents to the named "data" that we will pass as a parameter to the function..


function drawVectorLayer(data){
	vectorsFromGeojson = L.geoJson(data);  //we have our geojson layer ready, but wait..we need to add it to the map to be able to see it..
	map.addLayer(vectorsFromGeojson);
}

//now that we know what we'r gonna do with the geojson data once it arrives (ie, our drawVectorLayer function will draw the features from the geojson data on our map),
//we can ask jquery to fetch the json for us, and pass it as parameter (ie "data") to our drawVectorLayer function..

jQuery.getJSON("data.geojson", drawVectorLayer);





//lets check our checklist: 1 done 2 done 3 done 4 done, lets do 5 n 6 now..
//for that, we'll tweak the drawVectorLayer function a bit..

//lets comment out the function definition from above and uncomment the one fro below..


//it's just minor changes to the code from before..

//we now have a function that does something to each vector layer that gets drawn using the geojson data..
//that soething includes binding a popup to each layer that opens up when the vector feature is clicked,
//and changing the layer's visual styling (colors and tranparency and border thickness n all that..)

/*function doSomethingOnEachFeature(feature, layer){
    layer.bindPopup("This is a popup.");  //first try this..
    //layer.bindPopup(feature.properties.name);  //then this..
    //then this:
    //layer.bindPopup(feature.properties.name+"<br/>"+feature.properties["operator:type"]+" "+feature.properties.amenity+"<br/>"+feature.properties["student:count"]+" students studied here in 2013<br/>"+"Source of Information: "+feature.properties.source); //bind a popup with feature's geojson notation as its content..the popup opens up when user clicks on the feature..
    
    var style = {  //create a styling for each layer
        color: "#0000ff",
        fillColor: "#ff0000",
        weight: 4
    };
    
    layer.setStyle(style);  //set layer styling..
    
}

//now tell our drawVectorLayer function what needs to be done to each layer while it is being converted from geojson data to a leaflet map layer..
function drawVectorLayer(data){
    
        var options = {  //to tell this function what to do to each feature while adding it as a vector layer to our map, we need to set it as an option parameter for leaflet's function that creates vector layers fro geojson data..
            onEachFeature: doSomethingOnEachFeature
        };
        
	vectorsFromGeojson = L.geoJson(data, options);  //we have our geojson layer ready, but wait..we need to add it to the map to be able to see it..
	map.addLayer(vectorsFromGeojson);
}*/


//check our checklist again..5 done, 6 done..!!