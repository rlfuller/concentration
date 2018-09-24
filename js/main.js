//Fisher–Yates shuffle
//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }


  //var cards = document.getElementsByClassName("card");
  var cards = document.querySelectorAll(".card");
  console.log("hello " + cards.length);
  
  
  
//   cards.forEach(function(card){
//     card.appendChild(i);
//   });

// rachel / tom dataset
var fragment = document.createDocumentFragment();




  
  
  let matchingClasses = [
    "fas fa-apple-alt unmatched",
    "fas fa-bomb unmatched",
    "fas fa-baseball-ball unmatched",
    "far fa-clock unmatched",
    "fas fa-bullseye unmatched",
    "far fa-dot-circle unmatched",
    "fas fa-exclamation-circle unmatched",
    "far fa-sun unmatched",
    "fas fa-apple-alt unmatched",
    "fas fa-bomb unmatched",
    "fas fa-baseball-ball unmatched",
    "far fa-clock unmatched",
    "fas fa-bullseye unmatched",
    "far fa-dot-circle unmatched",
    "fas fa-exclamation-circle unmatched",
    "far fa-sun unmatched"
  ];

  //let shuffledArrary = new Array();
  //let shuffledArray = shuffle(matchingClasses);

  let successIcon = "far fa-grin";

  function setUpBoard(){
    let shuffledArray = shuffle(matchingClasses);
    for (let i = 0; i < 16; i++){
      let div = document.createElement("div");
      let backOfCard = document.createElement("i");
      let frontOfCard = document.createElement("i");
      div.className = "card";
      
  
      backOfCard.className = "far fa-meh";
      frontOfCard.className = shuffledArray[i];
      div.addEventListener("mouseenter", function(e){
        backOfCard.className = "far fa-surprise";
      });
      div.addEventListener("mouseleave", function(e){
        backOfCard.className = "far fa-meh";
      });

      div.addEventListener("click", function(){
        backOfCard.classList.add("unmatched");
        frontOfCard.classList.remove("unmatched");
      })
      div.appendChild(backOfCard);
      div.appendChild(frontOfCard);
      fragment.appendChild(div);
  
    }
    document.querySelector("main").appendChild(fragment);
  }

  document.addEventListener("DOMContentLoaded", setUpBoard());

  let attempts = 0;
