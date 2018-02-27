

function processRestaurants(restaurantLoc, userLat, userLng, restaurantName, restaurant) {

  var restaurantLat = restaurantLoc.lat;
  var restaurantLng = restaurantLoc.lng;

  var latDif = restaurantLat - userLat;
  latDif = Math.abs(latDif);
  console.log(restaurantName + ': etäisyys leveysasteina ' + latDif);
  var lngDif = restaurantLng - userLng;
  lngDif = Math.abs(lngDif);
  console.log(restaurantName + ': etäisyys pituusasteina ' + lngDif);

  if((lngDif < 0.135000) && (latDif < 0.135000)){
    theArray.push(restaurant);
    console.log(restaurantName + ' on riittävän lähellä')
  }else {
    console.log(restaurantName + ' on liian kaukana');
  }
  console.log('arrayn sisältö: '+ theArray);


  //why is this undefined even though it's global var?


}



function displayRestaurant() {

  var arrayLength = theArray.length;
  var randomNum = Math.floor(Math.random()*arrayLength);
  chosenRestaurant = theArray[randomNum];
  console.log('Tämän pitäisi olla vika funkkari');
  restaurantLoc = {lat: chosenRestaurant.lat, lng: chosenRestaurant.lng};
  jQuery("#restaurant-info").html(
    "<h2>"+ chosenRestaurant.name +"</h2>" +
    "<p>"+ chosenRestaurant.address +"</p>"
  );


}
