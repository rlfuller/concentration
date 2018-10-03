//variables

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
let matches = 0;
const matchesAvailable = matchingClasses.length //total number of matches to reach

//double the elements so we can have pairs
matchingClasses = matchingClasses.concat(matchingClasses);

let firstCard = null;
let secondCard = null;
let timer = null;

let attempts = 0;
let running = false;
let timerStarted = false;
let seconds = 0;
let minutes = 0;

let gameGrid = document.getElementById("game-grid");
let progress = document.querySelector(".progress");
let time = document.querySelector(".time");
let modalTime = document.getElementById("final-time");
let modal = document.getElementById("modal");

//events setup

document.addEventListener("DOMContentLoaded", function(){
  setUpBoard(matchingClasses, gameGrid);
});

document.querySelector(".restart").addEventListener("click", function(){
  setUpBoard(matchingClasses, gameGrid);
});


//function declarations

/**
 * @description Fisher–Yates shuffle
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {array} array to be shuffled
 * @returns {array} a shuffled array
 */
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

/**
 * @description runs every time the user clicks on a card, main function 
 * that determines if there is a match or not and flips the cards
 * @param {object} ev 
 */
function clickForMatch(ev){
  if (running){ //avoid race condition
    return;
  }
  if (firstCard === null){
    //start the timer if it isn't already running
    if (timerStarted === false){
      timer = setInterval(startTimer, 1000);
    }
  
    firstCard = ev.currentTarget;
    showCard(firstCard);

  } else {
    //this is the second click of two, from here, we can check for match
    secondCard = ev.currentTarget;
    showCard(secondCard);
    
    let firstClasses = firstCard.querySelector("i").classList;
    let secondClasses = secondCard.querySelector("i").classList;

    let firstCardImg = Array.from(firstClasses).filter((firstClass) => firstClass.startsWith("fa-"))[0];
    let secondCardImg = Array.from(secondClasses).filter((secondClass) => secondClass.startsWith("fa-"))[0];
    
    //for troubleshooting
    //console.log(firstCardImg);
    //console.log(secondCardImg);

    attempts++;
    progress.textContent = `${attempts} move${attempts != 1 ? "s" : ""}`;
    evaluateGameProgress(attempts);
    
    if (firstCardImg === secondCardImg){
      //this is a match
      itsAMatch(firstCard, secondCard);
    } else {
      //this is not a match
      resetCards(firstCard, secondCard);
    }

    firstCard = null;
  }
}

/**
 * @description Flips the cards back over if there is no match, 
 * but it does it on a delay so the user has enough time to view the 
 * second card before the pair is turned over
 * @param {object} firstCard; this is a web element representing the first clicked card
 * @param {object} secondCard; this is a web element representing the second clicked card
 */
function resetCards(firstCard, secondCard){
  running = true;
  setTimeout(function(){
    firstCard.classList.toggle("selected");
    secondCard.classList.toggle("selected");
    firstCard.classList.toggle("unmatched");
    secondCard.classList.toggle("unmatched");
    firstCard.addEventListener("click", clickForMatch);
    secondCard.addEventListener("click", clickForMatch);
    firstCard.querySelector("i").classList.toggle("image-down");
    secondCard.querySelector("i").classList.toggle("image-down");
    running = false;
  }, 750);
}

/**
 * @description Reveals the 'image' on a card
 * @param {object} card
 */
function showCard(card) {
  card.querySelector("i").classList.toggle("image-down");
  card.removeEventListener("click", clickForMatch);
  card.classList.toggle("selected");
  card.classList.toggle("unmatched");
}

/**
 * @description Helper function to make sure that cards that are selected
 * cannot be clicked again unless the are not a match
 * @param {object} firstCard 
 * @param {object} secondCard 
 */
function itsAMatch(firstCard, secondCard){
  firstCard.removeEventListener("click", clickForMatch, false);
  secondCard.removeEventListener("click", clickForMatch, false);
  firstCard.classList.add("match");
  secondCard.classList.add("match");

  matches--;
  if (matches === 0){
    //win
    modal.classList.add("show");
    modal.querySelector(".modal-restart").addEventListener("click", function(){
      setUpBoard(matchingClasses, gameGrid);
    });
    //set modal progress text
    modal.querySelector("#final-moves").textContent = `It took you ${attempts} moves to win`;
    //set modal time & stop the timer
    stopTime();
  }
}

/**
 * @description evaluates the game progress, sets the rating stars
 * @param {number} attempts 
 */
function evaluateGameProgress(attempts){
  // 2 stars
  if (attempts > matchesAvailable + (matchesAvailable * .3)){
    document.querySelector(".stars i:nth-child(3)").className = "far fa-star";
  } 
  //1 star
  if (attempts > matchesAvailable + (matchesAvailable * .8)) {
    document.querySelector(".stars i:nth-child(2)").className = "far fa-star";
  }
}

/**
 * @description Setups up the board, shuffles and deals the cards
 * @param {array} arr 
 * @param {object} gameGrid 
 */
function setUpBoard(arr, gameGrid){
  let fragment = document.createDocumentFragment();
  let shuffledArray = shuffle(arr);

  //create the cards, 1 div for each array element
  for (let i = 0; i < arr.length; i++){
    let card = document.createElement("div");
    let frontOfCard = document.createElement("i");
    card.className = "card unmatched";

    frontOfCard.className = shuffledArray[i];
    frontOfCard.classList.add("image-down");

    card.addEventListener("click",clickForMatch);

    card.appendChild(frontOfCard);
    fragment.appendChild(card);
  }

  //if the user has clicked reset or won the game, remove all
  //game-grid elements so we can start append new
  while(gameGrid.childNodes.length){
    gameGrid.removeChild(gameGrid.childNodes[0]);
  }
  gameGrid.appendChild(fragment);

  //reset the progress and hide the modal
  attempts = 0;
  progress.textContent = `${attempts} moves`;
  resetProgressStars();
  modal.classList.remove("show");
  matches = matchesAvailable;
  stopTime();
}

/**
 * @description resets the progress stars back to an original state
 */
function resetProgressStars(){
  let stars = document.querySelectorAll(".stars i");
  stars.forEach(function(star){
    star.className = "fas fa-star";
  });
}

/**
 * @description starts a timer function when the first card is clicked
 */
function startTimer(){
  timerStarted = true;
  seconds += 1;
  if (seconds === 60){
    minutes += 1; 
    seconds = 0;
  }
  displayTime();
}

/**
 * @description displays the time on the main page
 */
function displayTime(){
  time.textContent = `${minutes} min ${seconds} sec`;
}

/**
 * @description stops the timer
 */
function stopTime(){
  timerStarted = false;
  clearInterval(timer);
  time.textContent = "0 min 0 sec";
  modalTime.textContent = `It took you ${minutes} minute(s) and ${seconds} seconds`;
  minutes = 0;
  seconds = 0;
}