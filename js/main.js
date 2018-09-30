let matchingClasses = [
  "fas fa-apple-alt", //append unmatched to the string in the function
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

let fragment = document.createDocumentFragment();

let firstCard = null;
let secondCard = null;

let attempts = 0;



document.addEventListener("DOMContentLoaded", function(){
  setUpBoard(matchingClasses);
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


// rachel / tom dataset





  
  
//for matching classes, redure to the 8 unique, then call shuff concat matching class to matchingclass
//pass in matching class below to the event listener
//rewrite the event listner function so you can pass in 
//with the class list , use filter, and not foreach, can't return from for each, use tom Array.from in chat
//put all variables at the top
//then initialization code
//then library of functions
// put all lets at top
// init function that binds all the event listeners
//then all the fuctions
// if variable is not going to change at runtime, call it const instead of let
  


  //let shuffledArrary = new Array();
  //let shuffledArray = shuffle(matchingClasses);

  // let successIcon = "far fa-grin";
  // let firstClickForMatch = false;
  // let secondClickForMatch = false;
  // let firstCardClass = "";
  // let secondCardClass = "";

  
  function clickForMatch(ev){
    console.log(ev);
    let match = false;
    if (firstCard === null){
      //we are in the first click of two
      firstCard = ev.currentTarget;
      //remove event listener so we can't click the same card
      firstCard.removeEventListener("click", clickForMatch);
      //secondCard = null; //we may not need this ......
    } else {
      //this is the second click of two, from here, we can check for match
      console.log("in the else", firstCard);
      secondCard = ev.currentTarget;

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
        firstCard.addEventListener("click", clickForMatch);
        //call some function to turn cards back over
      }

      firstCard = null;
    }
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
  

  // function clickForMatch(el){ /* pass the element on each click so we can deal with the event listeners */
  //   console.log("1 ajfsdfjsl ", el);
  //   console.log("firstEl", firstEl);
  //   let match = false;
  //   if (firstEl === null){
      
  //     firstEl  = el; 
  //     console.log("first El", firstEl);
  //     secondEl === null;
  //     // firstCardClass = el.classList.get the class out of the classlist that starts with fa-
  //     // secondCardClass = "";
  //     // firstEl = el;
  //     // secondEl = null;
  //   } else {
  //     console.log("if in the else", firstEl);
  //     secondEl = el;
  //     // secondClickForMatch === true; /*may not need this */
  //     // firstClickForMatch === false;
  //     // secondCardClass = el.classList.get the class out of the classList that starts wtih fa-
  //     //if (secondEl.querySelector("i").classList.)
  //     //get the firstCard icon
  //     let firstClasses = firstEl.querySelector("i").classList;
  //     let secondClasses = secondEl.querySelector("i").classList;
  //     console.log(firstClasses, secondClasses);

  //     //thisis returning an array so when we use it we need to take firstIcon[0]
  //     let firstIcon = Array.from(firstClasses).filter((firstClass) => firstClass.startsWith("fa-"))[0];

  //     console.log("rachel - firsticon", firstIcon[0]);

  //     let secondIcon = Array.from(secondClasses).filter((secondClass) => secondClass.startsWith("fa-"))[0];

  //     console.log("tom  - ", secondIcon);

  //     if (firstIcon === secondIcon){
  //       //if here, this is a match
  //       //1)remove the event listeners from the first and second el
  //       //2) change the curstor from a pointer to a non-pointer
  //       //2) some sort of animation and maybe a message
  //       //4) update some sort of total matches
  //       console.log("hello");
  //       console.log(firstIcon, secondIcon);

  //       match = true;
  //       //call some function to remove event listeners and do match stuff;
  //       itsAMatch(firstEl, secondEl);
  //     } else {
  //       //if here, this is not a match
  //       //flip the cards back over, show the back
  //       console.log("goodbye");
  //       match = false;
  //       //call some function to turn cards back over
        
  //     }
  //     //update the total moves and check to see if we need to change the status / progress /take a star away
  //     // if (secondCardClass === firstCardClass){       
  //     //   that's a match so 
  //     //   1) some sort of transition where it's a match
  //     //   2) disable the cursor and remove clicks as these can't be matched anymore or clicked anymore
  //     //   3) remove the event listener from both of these --- but how to remove the event
  //     //     listener from the first card as now we are on the second card
       
  //     // } else {
  //     //   that's not a match, so we need to 
  //     //   1) turn both cards bach over
  //     //   how do we do this as we are now on the second card
  //     // }
  //     // then {
  //     //   4) update some sort of counter about matches found or matches left
  //     //   5) update some sort of counter about how many turns on each second click to set progress / status
  //     // }

      

  //     if (match === true){
  //       //remove the click event listeners from each element as this is a match
  //       firstEl.removeEventListener("click", clickForMatch,false);
  //       console.log("right here right now skdjsldjs");
  //       secondEl.removeEventListener("click", clickForMatch, false);
  //     }

  //     firstEl = null;

  //   }
  // };

  function setUpBoard(arr){
    let shuffledArray = shuffle(arr);
    for (let i = 0; i < arr.length; i++){
      let card = document.createElement("div");
      //let backOfCard = document.createElement("i");
      let frontOfCard = document.createElement("i");
      card.className = "card unmatched";

      frontOfCard.className = shuffledArray[i];

      card.addEventListener("click",clickForMatch);

      card.appendChild(frontOfCard);
      fragment.appendChild(card);
    }
    document.querySelector("main").appendChild(fragment);
  }

  // function setUpBoard(){
  //   let shuffledArray = shuffle(matchingClasses);
  //   for (let i = 0; i < matchingClasses.length; i++){
  //     let div = document.createElement("div");
  //     let backOfCard = document.createElement("i");
  //     let frontOfCard = document.createElement("i");
  //     div.className = "card";
      
  
  //     backOfCard.className = "far fa-meh";
  //     frontOfCard.className = shuffledArray[i];
  //     // div.addEventListener("mouseenter", function(e){
  //     //   backOfCard.className = "far fa-surprise";
  //     // });
  //     // div.addEventListener("mouseleave", function(e){
  //     //   backOfCard.className = "far fa-meh";
  //     // });

  //     div.addEventListener("click", function(e){
  //       console.log("here", e.target);
  //       console.log(typeof(e.target));
  //       clickForMatch(e.target);
  //     })
  //     // div.appendChild(backOfCard);
  //     div.appendChild(frontOfCard);
  //     fragment.appendChild(div);
  
  //   }
  //   document.querySelector("main").appendChild(fragment);
  // }

  

  
