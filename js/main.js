let matchingClasses = [
  "fas fa-apple-alt",
  "fas fa-bomb",
  "fas fa-baseball-ball",
  "far fa-clock",
  "fas fa-bullseye",
  "far fa-dot-circle",
  "fas fa-exclamation-circle",
  "far fa-sun"
];
let matches = matchingClasses.length; //total number of matches to reach
const matchesAvailable = matches

matchingClasses = matchingClasses.concat(matchingClasses);

let firstCard = null;
let secondCard = null;

let attempts = 0;

let gameGrid = document.getElementById("game-grid");


document.addEventListener("DOMContentLoaded", function(){
  setUpBoard(matchingClasses, gameGrid);
});

document.querySelector(".restart").addEventListener("click", function(){
  console.log('jadkfsjf');
  setUpBoard(matchingClasses, gameGrid);
  console.log('akjdsfj');
});



//function declarations

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

  
  function clickForMatch(ev){
    console.log(ev);
    let match = false;
    if (firstCard === null){
      firstCard = ev.currentTarget;
      //remove event listener so we can't click the same card
      
      showCard(firstCard);
      //secondCard = null; //we may not need this ......
    } else {
      //this is the second click of two, from here, we can check for match
      console.log("in the else", firstCard);
      secondCard = ev.currentTarget;
      // secondCard.classList.toggle("selected");

      showCard(secondCard);

      let firstClasses = firstCard.querySelector("i").classList;
      let secondClasses = secondCard.querySelector("i").classList;
      console.log(firstClasses, secondClasses);

      let firstCardImg = Array.from(firstClasses).filter((firstClass) => firstClass.startsWith("fa-"))[0];
      console.log(firstCardImg);
      let secondCardImg = Array.from(secondClasses).filter((secondClass) => secondClass.startsWith("fa-"))[0];
      console.log(secondCardImg);

      attempts++;
      evaluateGameProgress(attempts);


      if (firstCardImg === secondCardImg){
        //this is a match
        match = true;
        //call some function to remove event listeners and do match stuff;
        itsAMatch(firstCard, secondCard);
      } else {
        //this is not a match
        match = false;
        //not a match, so add back the event listener
        // firstCard.addEventListener("click", clickForMatch);
        
        //call some function to turn cards back over
        resetCards(firstCard, secondCard);
      }

      firstCard = null;
    }
  };

  function resetCards(firstCard, secondCard){
    setTimeout(function(){
      firstCard.classList.toggle("selected");
      secondCard.classList.toggle("selected");
      firstCard.classList.toggle("unmatched");
      secondCard.classList.toggle("unmatched");
      firstCard.addEventListener("click", clickForMatch);
      secondCard.addEventListener("click", clickForMatch);
      firstCard.querySelector("i").classList.toggle("image-down");
      console.log("chester is a foo");
      secondCard.querySelector("i").classList.toggle("image-down");
    }, 750);
  };

  function showCard(card) {
    card.querySelector("i").classList.toggle("image-down");
    card.removeEventListener("click", clickForMatch);
    card.classList.toggle("selected");
    card.classList.toggle("unmatched");
  };

  function itsAMatch(firstCard, secondCard){
    firstCard.removeEventListener("click", clickForMatch, false);
    secondCard.removeEventListener("click", clickForMatch, false);
    firstCard.classList.add("match");
    secondCard.classList.add("match");

    matches--;
    if (matches === 0){
      //win
      //do some winning stuff
    }
  };


  function evaluateGameProgress(attempts){

    if (attempts > matchesAvailable + (matchesAvailable * .3)){
      // 2 stars
      document.querySelector(".progress i:nth-child(3)").className = "far fa-star progress-best";
    } 
    if (attempts > matchesAvailable + (matchesAvailable * .6)) {
      document.querySelector(".progress i:nth-child(2)").className = "far fa-star progress-better";
    }
  };


  function setUpBoard(arr, gameGrid){
    console.log("jfsldfjs    from restart");
    let fragment = document.createDocumentFragment();
    let shuffledArray = shuffle(arr);
    for (let i = 0; i < arr.length; i++){
      let card = document.createElement("div");
      //let backOfCard = document.createElement("i");
      let frontOfCard = document.createElement("i");
      card.className = "card unmatched";

      frontOfCard.className = shuffledArray[i];
      frontOfCard.classList.add("image-down");

      card.addEventListener("click",clickForMatch);

      card.appendChild(frontOfCard);
      fragment.appendChild(card);
    }
    while(gameGrid.childNodes.length){
      gameGrid.removeChild(gameGrid.childNodes[0]);
    }
    gameGrid.appendChild(fragment);
  };
