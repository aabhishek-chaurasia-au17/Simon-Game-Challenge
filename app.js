let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let numClicks = 0
let started = false;
let level = 0;

const levelTitle = document.querySelector("#level-title")
const button = document.querySelectorAll(".btn")

document.body.addEventListener("keypress", startgame)

function startgame(e) {
    if (!started) {
      
      levelTitle.textContent  = `Level ${level}`;
      started = true;
      nextSequence();
      startListenningForClick()
    }
}

function resetGame() {
  level = 0;
  levelTitle.textContent  = `Level ${level}`;
  gamePattern = [];
  started = false;
  numClicks = 0
}


function startListenningForClick() {
  for(let i = 0; i < button.length; i++){
    button[i].addEventListener('click', onButtonClick)
  };
}


function onButtonClick() {
  let userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenColour);
}

function checkAnswer(userChosenColour) {
    numClicks += 1
    if (gamePattern[numClicks -1] !== userChosenColour) {
      gameOver();
    }
    if (numClicks === gamePattern.length){
        numClicks = 0
        setTimeout(function () {
          nextSequence();
        }, 1000);
      } 
}


function gameOver() {
    playSound("wrong");
      document.body.classList.add("game-over");
      levelTitle.textContent = "Game Over, Press Any Key to Restart";

      setTimeout(function () {
        document.body.classList.remove("game-over");
      }, 200);
      // stopListeingForClick()
      resetGame();
}

function stopListeingForClick() {
  button.forEach(button => {
    button.removeEventListener('click', onButtonClick)
  });
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  levelTitle.textContent = `Level ${level}`;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  
  document.querySelector("#" + randomChosenColour).classList.add("getopacity");
  setTimeout(function name() {
      document.querySelector("#" + randomChosenColour).classList.remove("getopacity");
  }, 500)
  playSound(randomChosenColour);
  
}

function animatePress(currentColor) {
  document.querySelector("#" + currentColor).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

