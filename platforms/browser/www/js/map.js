//TODO
/*
OK- Hae firebasesta tieto ravintoiloiden LatLng
OK- Erottele Käyttäjän sijainnista Lat ja lng
OK- Vertaile ovatko riittävän lähellä (vaatii vähän laskemista). Voit myös katsoa toimisiko google mapsin distance työkalut.
In Progress- Tee if lauseke ja lisää mukaan otettavat ravintolat arrayhin
In Progress- Tee ravintoiloista array
OK- Arvo numero 0 ja array.length välillä
- Tee valitusta ravintolasta marker mapsiin ja perusta kartta myös siihen
- Näytä ravintolan nimi yms kartan alapuolella
*/

//GLOBAL VARIABLES (SORRY)
var theArray = [];
//default location near Helsinki Central Station in case geolocation is disabled
var defaultLoc = {lat: 60.170456, lng: 24.942133};
var userLocation;
var restaurantLoc;
var chosenRestaurant;

function initMap() {
    //Google maps uses this as a callback function automaticly

    //Check if geolocation is enabled
    if (navigator && navigator.geolocation) {
      console.log('arrayn sisältö initmapin alussa: '+ theArray);
      //get users current position and init successCallback function
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    } else {
      //If geolocation is disabled user default location
      userLocation = defaultLoc;
      console.log('geolocation not allowed');
    }

    function errorCallback() {
      //something went wrong with geolocation even though it's allowed. Bad signal for example
      console.log('error with geolocation');
      userLat = defaultLoc.lat;
      userLng = defaultLoc.lng;
      userLocation = new google.maps.LatLng(defaultLoc.lat, defaultLoc.lng);
      restaurantLoop();
      setMapMarkers();
      displayRestaurant();
    }

  function successCallback(position) {
      //make users position a google maps LanLng object literal
      userLat = position.coords.latitude;
      userLng = position.coords.longitude;
      userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      restaurantLoop();

      console.log('arrayn sisältö succes callbackin lopussa: '+ theArray);

    }

}


function restaurantLoop() {

  //This part of the code gets restaurants from firebase
  var firebaseSaveRef = firebase.database().ref("Restaurants");
  var indexArray = [];
  firebaseSaveRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var restaurants = childSnapshot.val();
      var restaurantName = childSnapshot.child("name").val();
      var restaurantType = childSnapshot.child("type").val();
      var restaurantAddress = childSnapshot.child("address").val();
      var restaurantLat = childSnapshot.child("lat").val();
      var restaurantLng = childSnapshot.child("lon").val();
      var restaurant = {
        'name': restaurantName,
        'lng': restaurantLng,
        'lat': restaurantLat,
        'address': restaurantAddress
      }
      console.log('Tämän pitäisi olla aiemmin kuin vikan');
      restaurantLoc = {lat: restaurantLat, lng: restaurantLng};

      processRestaurants(restaurantLoc, userLat, userLng, restaurantName, restaurant);

      indexArray.push(restaurants);

      //This measures what is the number of iteration going
      var index = indexArray.length;
      //This is total size of data snapshot
      var size = snapshot.numChildren();

      console.log('arrayn sisältö loopin sisällä: '+ theArray);

      if(index  === size) {
                //After last iteration of the loop we set map markers and print restaurant information

                displayRestaurant();
                setMapMarkers();


         }

  });

});

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
