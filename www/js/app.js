function displayData() {
  var firebaseGetRef = firebase.database().ref("Items");

}

  $(document).one("pagebeforecreate", function () { //Ennen minkä tahansa sivun luomista, tehdään kerran (.one)

  });

  $(document).on("pagecreate", "#welcome", function() { 	//Sivun luonti, tehdään kerran
    let welcomeMsg = "<a href='#result'><h2 id='xiongWelcomeMsg'>Click for random restaurant near you</h2></a>";
    $('.main').html(welcomeMsg);


  });

  $(document).on("pagecreate", "#result", function() {		//Sivun luonti, tehdään kerran

    initMap();

});

  $(document).on("pagecontainerbeforeshow", function( event, ui ) {	//Ennen minkä tahansa sivun näyttämistä. (pagebeforeshow is deprecated)
    var toPage = ui.toPage[0].id; //Mille sivulle ollaan menossa, palauttaa sivun id:n


    if(toPage=="etusivu") {

    }

  });

  $(document).on("pagecontainershow", function( event, ui ) {	//Mikä tahansa sivu näytetään.
    var toPage = ui.toPage[0].id; //Mikä sivu on näytetty, palauttaa sivun id:n
  });
