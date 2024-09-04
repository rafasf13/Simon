const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var iterator = 0;
$(document).keypress(startGame);
$("h1").click(startGame);
$(".btn").click(testSequence);

function nextSequence() {
  $("h1").text("Level " + gamePattern.length);
  iterator = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomNumber]);
  flash(buttonColours[randomNumber]);
  sound(buttonColours[randomNumber]);
  console.log(gamePattern);
}

function sound(color) {
  var soundFile = new Audio("./sounds/" + color + ".mp3");
  soundFile.play();
}
function flash(color) {
  $("." + color).css("background-color", "white");
  setTimeout(function () {
    $("." + color).css("background-color", color);
  }, 200);
  console.log("flash(" + color + ")");
}

function testSequence() {
  if (gamePattern[iterator] === this.id) {
    flash(this.id);
    sound(this.id);
    iterator++;
    if (iterator == gamePattern.length) setTimeout(nextSequence, 500);
  } else {
    $("body").addClass("game-over");
    sound("wrong");
    gamePattern = [];
  }
  console.log("iterator: " + iterator + ", clicked: " + this.id);
}

function startGame() {
  if (gamePattern.length === 0) {
    $("body").removeClass("game-over");
    nextSequence();
  }
}
