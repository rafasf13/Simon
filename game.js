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
  repeatPattern();
  console.log(gamePattern);
}

function play(color) {
  sound(color);
  flash(color);
}
function sound(color) {
  var soundFile = new Audio("./sounds/" + color + ".m4a");
  soundFile.play();
}
function flash(color) {
  $("." + color).css("background-color", "gray");
  setTimeout(function () {
    $("." + color).css("background-color", color);
  }, 200);
  console.log("flash(" + color + ")");
}

function testSequence() {
  if (gamePattern.length === 0) {
    startGame();
    return;
  }
  if (gamePattern[iterator] === this.id) {
    flash(this.id);
    sound(this.id);
    iterator++;
    if (iterator == gamePattern.length) setTimeout(nextSequence, 600);
  } else {
    sound("wrong");
    $("h1").text("Loser! Reiniciar?");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

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

function repeatPattern(index = 0) {
  if (index < gamePattern.length) {
    setTimeout(function () {
      flash(gamePattern[index]);
      sound(gamePattern[index]);
      repeatPattern(index + 1);
    }, 500);
  }
}
