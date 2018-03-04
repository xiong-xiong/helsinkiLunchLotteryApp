//TODO
/*
OK- Hae firebasesta tieto ravintoiloiden LatLng
OK- Erottele Käyttäjän sijainnista Lat ja lng
OK- Vertaile ovatko riittävän lähellä (vaatii vähän laskemista). Voit myös katsoa toimisiko google mapsin distance työkalut.
OK- Tee if lauseke ja lisää mukaan otettavat ravintolat arrayhin
OK- Tee ravintoiloista array
OK- Arvo numero 0 ja array.length välillä
OK- Tee valitusta ravintolasta marker mapsiin ja perusta kartta myös siihen
OK- Näytä ravintolan nimi yms kartan alapuolella
*/

//GLOBAL VARIABLES (SORRY)
var theArray = [];
//default location near Helsinki Central Station in case geolocation is disabled
var defaultLoc = {lat: 60.170456, lng: 24.942133};
var userLocation;
var restaurantLoc;
var chosenRestaurant;

function initMap() {


    //Google maps uses this as a callback function automaticly so it's kind of MAIN in this app

    //Check if geolocation is enabled
    if (navigator && navigator.geolocation) {

      //get users current position and init successCallback function
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    } else {
      //If geolocation is disabled user default location
      userLocation = defaultLoc;

    }

    function errorCallback() {
      //something went wrong with geolocation even though it's allowed. Bad signal for example

      userLat = defaultLoc.lat;
      userLng = defaultLoc.lng;
      userLocation = new google.maps.LatLng(defaultLoc.lat, defaultLoc.lng);
      restaurantLoop();

    }

  function successCallback(position) {
      //make users position a google maps LanLng object literal
      userLat = position.coords.latitude;
      userLng = position.coords.longitude;
      userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      restaurantLoop();

    }

}



function setMapMarkers() {

  //Draw a map with restaurantLoc as a center point
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: userLocation
  });
  //set marker on userLocation
  var marker = new google.maps.Marker({
    position: userLocation,
    map: map
  });

  //set marker on restaurantLoc
  var marker = new google.maps.Marker({
    position: restaurantLoc,
    map: map
  });
}
