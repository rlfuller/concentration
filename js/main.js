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
  let firstClickForMatch = false;
  let secondClickForMatch = false;
  let firstCardClass = "";
  let secondCardClass = "";
  let firstEl = null;
  let secondEl = null;
  

  function clickForMatch(el){ /* pass the element on each click so we can deal with the event listeners */
    if (firstEl === null){
      firstEl  = el; 
      secondEl === null;
      // firstCardClass = el.classList.get the class out of the classlist that starts with fa-
      // secondCardClass = "";
      // firstEl = el;
      // secondEl = null;
    } else {
      secondEl = el;
      // secondClickForMatch === true; /*may not need this */
      // firstClickForMatch === false;
      // secondCardClass = el.classList.get the class out of the classList that starts wtih fa-
      //if (secondEl.querySelector("i").classList.)
      //get the firstCard icon
      let firstClasses = firstEl.querySelector("i").classList;
      let secondClasses = secondEl.querySelector("i").classList;
      let firstIcon = firstClasses.forEach(function(firstClass){
        if(firstClass.startsWith("fa-")){
          return firstClass;
        }
      });
      let secondIcon = secondClasses.forEach(function(secondClass){
        if(secondClass.startsWith("fa-")){
          return secondClass;
        }
      });

      if (firstIcon === secondIcon){
        //if here, this is a match
        //1)remove the event listeners from the first and second el
        //2) change the curstor from a pointer to a non-pointer
        //2) some sort of animation and maybe a message
        //4) update some sort of total matches
      } else {
        //if here, this is not a match
        //flip the cards back over, show the back
        
      }
      //update the total moves and check to see if we need to change the status / progress /take a star away
      // if (secondCardClass === firstCardClass){       
      //   that's a match so 
      //   1) some sort of transition where it's a match
      //   2) disable the cursor and remove clicks as these can't be matched anymore or clicked anymore
      //   3) remove the event listener from both of these --- but how to remove the event
      //     listener from the first card as now we are on the second card
       
      // } else {
      //   that's not a match, so we need to 
      //   1) turn both cards bach over
      //   how do we do this as we are now on the second card
      // }
      // then {
      //   4) update some sort of counter about matches found or matches left
      //   5) update some sort of counter about how many turns on each second click to set progress / status
      // }

      firstEl = null;

    }
  };

  function setUpBoard(){
    let shuffledArray = shuffle(matchingClasses);
    for (let i = 0; i < 16; i++){
      let div = document.createElement("div");
      let backOfCard = document.createElement("i");
      let frontOfCard = document.createElement("i");
      div.className = "card";
      
  
      backOfCard.className = "far fa-meh";
      frontOfCard.className = shuffledArray[i];
      // div.addEventListener("mouseenter", function(e){
      //   backOfCard.className = "far fa-surprise";
      // });
      // div.addEventListener("mouseleave", function(e){
      //   backOfCard.className = "far fa-meh";
      // });

      div.addEventListener("click", function(e){
        clickForMatch(e.target);
      })
      div.appendChild(backOfCard);
      div.appendChild(frontOfCard);
      fragment.appendChild(div);
  
    }
    document.querySelector("main").appendChild(fragment);
  }

  document.addEventListener("DOMContentLoaded", setUpBoard());

  let attempts = 0;
