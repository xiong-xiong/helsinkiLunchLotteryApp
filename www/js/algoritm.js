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
      var restaurantUrl = childSnapshot.child("url").val();
      //Create easy to handle object for processRestaurants function and displayRestaurant to handle
      var restaurant = {
        'name': restaurantName,
        'lng': restaurantLng,
        'lat': restaurantLat,
        'address': restaurantAddress,
        'type': restaurantType,
        'url': restaurantUrl
      }

      restaurantLoc = {lat: restaurantLat, lng: restaurantLng};

      processRestaurants(restaurantLoc, userLat, userLng, restaurantName, restaurant);

      indexArray.push(restaurants);

      //This measures what is the number of iteration going
      var index = indexArray.length;
      //This is total size of data snapshot
      var size = snapshot.numChildren();

      if(index  === size) {
                //After last iteration of the loop we set map markers and print restaurant information

                displayRestaurant();
                setMapMarkers();


         }

  });

});

}

function processRestaurants(restaurantLoc, userLat, userLng, restaurantName, restaurant) {
//THIS IS THE ALGORITHM THAT DEFINES IS USER CLOSE ENOUGH FOR RESTAURANT TO BE INCLUDED IN LOTTERY
  var restaurantLat = restaurantLoc.lat;
  var restaurantLng = restaurantLoc.lng;

  var latDif = restaurantLat - userLat;
  latDif = Math.abs(latDif);
  // console.log(restaurantName + ': etäisyys leveysasteina ' + latDif);
  var lngDif = restaurantLng - userLng;
  lngDif = Math.abs(lngDif);
  // console.log(restaurantName + ': etäisyys pituusasteina ' + lngDif);

  if((lngDif < 0.035000) && (latDif < 0.035000)){
    theArray.push(restaurant);
    // console.log(restaurantName + ' on riittävän lähellä')
  }else {
    // console.log(restaurantName + ' on liian kaukana');
  }



  //why is this undefined even though it's global var?


}



function displayRestaurant() {

  var arrayLength = theArray.length;
  var randomNum = Math.floor(Math.random()*arrayLength);
  chosenRestaurant = theArray[randomNum];
  restaurantLoc = {lat: chosenRestaurant.lat, lng: chosenRestaurant.lng};
  if(chosenRestaurant.url != 'NA'||null) {
    var lunchMenu = "<a class='lunchMenuBtn' href='" + chosenRestaurant.url + "' class='menuBtn'> Lunch Menu </a>";
  }else {
    var lunchMenu = "Ravintolalla ei ole verkkosivuja";
  }
  jQuery("#restaurant-info").html(
    "<h2>"+ chosenRestaurant.name +"</h2>" +
    "<p><em>"+ chosenRestaurant.type +"</em></p>" +
    "<p>"+ chosenRestaurant.address + "</p>" +
    "<p>"+ lunchMenu +
    "<span class='lunchMenuBtn' onclick='location.reload()'>Reset</span></p>"
  );


}
