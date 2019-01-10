buttonColors = ["red", "blue", "green", "yellow"];

userClickedPattern = [];
gamePattern = [];

gameLevel = 0;

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false; //started=false; is same

//respond to a keypress
$(document).keypress(
  function() {
    if (!started) {
      nextSequence();
      $("h1").text("Level " + gameLevel);
      started = true;
    }
  }
);


// respond to a click
$(".btn").click(
  function() {
    // alert("clicked");
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    clickedAnimation(userChosenColor);

    //console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1); // passing the index of the last answer in the user's sequence.
    //console.log("lastClick="+userClickedPattern[userClickedPattern.length-1]);
  }
);

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    //console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
          nextSequence();
        },
        1000
      )
    }
  } else {
    //console.log("Wrong");
    wrongAnswer();
    wrongAnswer();
  }
};


function wrongAnswer() {
  $("body").addClass("game-over");
  wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  setTimeout(function() {
    $("body").removeClass("game-over");

  }, 500);

  emoji = ["🖕", "🤓", "😜", "🤪", "👻"];
  randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

  $("h1").text("Game Over " + randomEmoji + " press any key to restart");
  startOver();
}


function startOver() {
  started = false;
  gameLevel = 0;
  gamePattern = [];
}


function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  randomNumber = Math.floor(Math.random() * 4);

  randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);

  makeSound(randomChosenColor);
  clickedAnimation(randomChosenColor);

  gameLevel++;
  $("h1").text("Level " + gameLevel);

};

//function for button animation
function clickedAnimation(randomChosenColor) {

  $("#" + randomChosenColor).addClass("pressed");
  setTimeout(function() {
      $("#" + randomChosenColor).removeClass("pressed")
    }, 100

  );
};

//make sound
function makeSound(color) {
  audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  /*switch (expression) {
    case expression:

      break;
    default:} */

};