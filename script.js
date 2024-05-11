function playComputerMove() {
  const generatedMove = Math.random();
  if (generatedMove >= 0 && generatedMove < 1 / 3) {
    return (result = "Rock");
  } else if (generatedMove >= 1 / 3 && generatedMove < 2 / 3) {
    return (result = "Paper");
  } else {
    return (result = "Scissors");
  }
}

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function playGame(playerMove) {
  let result = "";
  const computerMove = playComputerMove();

  if (computerMove === "Rock") {
    if (playerMove === "Rock") {
      result = "Tie";
    } else if (playerMove === "Paper") {
      result = "You win";
    } else if (playerMove === "Scissors") {
      result = "You lose";
    }
  } else if (computerMove === "Paper") {
    if (playerMove === "Rock") {
      result = "You lose";
    } else if (playerMove === "Paper") {
      result = "Tie";
    } else if (playerMove === "Scissors") {
      result = "You win";
    }
  } else if (computerMove === "Scissors") {
    if (playerMove === "Rock") {
      result = "You win";
    } else if (playerMove === "Paper") {
      result = "You lose";
    } else if (playerMove === "Scissors") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You 
  <img src="Assets/Images/${playerMove}-emoji.png" alt="Rock" class="move-icon">
  <img src="Assets/Images/${computerMove}-emoji.png" alt="Paper" class="move-icon">
  Computer`;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses:${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");

  updateScore();
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector(".auto-play-button").innerHTML = "Stop";
    intervalID = setInterval(function () {
      const playerMove = playComputerMove();
      playGame(playerMove);
    }, 1);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector(".auto-play-button").innerHTML = "Auto Play";
  }
}
