var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= []

var started = false;
var level = 0;

$(document).keydown(function(){
  //so that keypress of only starting is detected..
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence(){

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //FLASHING THE SELECTED BUTTON
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //AUDIO PLAYING FOR THE BUTTON
  playSound(randomChosenColour);
}


function playSound(name){

  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100);
}
