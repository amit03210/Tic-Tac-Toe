// Utils data
let Utils = (function () {
  const cells = document.querySelectorAll(".cell");
  const player1Score = document.querySelector(".player-1-score .score");
  const player2Score = document.querySelector(".player-2-score .score");
  const counter = document.querySelector(".counter");
  const overlay = document.querySelector(".game-finish");

  cells.forEach((cell, index) => cell.setAttribute("data-index", index));
  return { cells, player1Score, player2Score, counter, overlay };
})();

let Board = function () {
  return ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
};

//Events
Utils.cells.forEach((cell) => cell.addEventListener("click", gamePlay));

let gameBoard = Board();
let isPlayer1 = true;

let horizontal = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
let vertical = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let left_diag = [[0, 4, 8]];
let right_diag = [[2, 4, 6]];

let Player = function (pSym, index) {
  if (index < 0 || index >= gameBoard.length) {
    return "Out of Bound Error";
  }
  let isWin;
  let winningCombo = null;

  let winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Setting the marker;
  if (gameBoard[index] != "-") {
    console.log(gameBoard[index]);
    // alert("cell already occupied");
  } else {
    //toggle isPlayer1;
    isPlayer1 = (!isPlayer1 && true) || false;

    gameBoard[index] = pSym;
    console.log(`Board Set to ${pSym} at ${index}`);

    let count = 0;
    for (let i = 0; i < 3; i++) {
      let result = "";
      for (j = 0; j < 3; j++) {
        result += gameBoard[count++] + "    ";
      }
      console.log(result);
    }

    isWin = winningCondition
      .map((arr) => {
        return arr.every((i) => gameBoard[i] === pSym);
      })
      .some((x) => x === true);

    for (let combo of winningCondition) {
      if (combo.every((i) => gameBoard[i] === pSym)) {
        winningCombo = combo;
        break;
      }
    }
  }
  return { isWin, pSym, winningCombo };
};

// First Time Choosing Player
let choosePlayer = (function (choose) {
  let player1;
  let player2;
  if (choose == "") choose = "x";
  let root = document.documentElement;
  root.style.setProperty("--player-1-symbol", `"${choose.toUpperCase()}"`);
  player1 = choose;
  if (choose != "o") {
    player2 = "o";
  } else {
    player2 = "x";
  }
  root.style.setProperty("--player-2-symbol", `"${player2.toUpperCase()}"`);

  return { player1, player2 };
})(prompt("Choose Symbol for Player 1"));

// Switching Player chance
let PlayerChance = function (pos) {
  if (isPlayer1) {
    return Player(choosePlayer.player1, pos);
  } else {
    return Player(choosePlayer.player2, pos);
  }
};

let gameActive = true;
//Methods
function gamePlay(e) {
  let index = e.target.dataset.index;
  display(e.target);
  countDown();
  let x = PlayerChance(index, e.target);

  if (x.isWin) {
    // alert(`${x.pSym} wins!`);
    console.log(`winning combo is `, x.winningCombo);

    let index = 0;
    let delay = 280;
    let score1 = Utils.player1Score;
    let score2 = Utils.player2Score;

    if (!isPlayer1) {
      score1.textContent = parseInt(score1.textContent) + 1;
    } else score2.textContent = parseInt(score2.textContent) + 1;

    if (checkSubArray(horizontal, x.winningCombo)) {
      x.winningCombo.forEach((eleIndex) => {
        let element = document.querySelector(`[data-index="${eleIndex}"]`);
        setTimeout(() => {
          element.classList.add("horizontal-strike");
        }, index * delay);
        index++;
      });
    } else if (checkSubArray(vertical, x.winningCombo)) {
      x.winningCombo.forEach((eleIndex) => {
        let element = document.querySelector(`[data-index="${eleIndex}"]`);

        setTimeout(() => {
          element.classList.add("vertical-strike");
        }, index * delay);
        index++;
      });
    } else if (checkSubArray(left_diag, x.winningCombo)) {
      x.winningCombo.forEach((eleIndex) => {
        let element = document.querySelector(`[data-index="${eleIndex}"]`);
        setTimeout(() => {
          element.classList.add("diag-left-strike");
        }, index * delay);
        index++;
      });
    } else if (checkSubArray(right_diag, x.winningCombo)) {
      x.winningCombo.forEach((eleIndex) => {
        let element = document.querySelector(`[data-index="${eleIndex}"]`);
        setTimeout(() => {
          element.classList.add("diag-right-strike");
        }, index * delay);
        index++;
      });
    }
    addOverlay();
    return;
  }

  if (!gameBoard.includes("-") && !x.isWin) {
    addOverlay();
    console.log("Game is Draw");
    gameActive = false;
  }
}

function checkSubArray(pArray, cArray) {
  let result = pArray.some((arr) => {
    return (
      arr.length === cArray.length && cArray.every((ele) => arr.includes(ele))
    );
  });
  return result;
}

function display(e) {
  console.log(e);
  if (isPlayer1 && !e.classList.contains("add-player-2-symbol")) {
    e.classList.add("add-player-1-symbol");
  } else {
    if (!e.classList.contains("add-player-1-symbol"))
      e.classList.add("add-player-2-symbol");
  }
}

function addOverlay() {
  Utils.overlay.classList.add("overlay");
}

function countDown() {
  let count = parseFloat(Utils.counter.textContent);
  for (let i = count; i >= 0; i--) {
    setTimeout(() => {
      Utils.counter.textContent = i;
    }, 500 * (count - i));
  }
}

function gameBoardReset() {
  Board();
  Utils.isWin = false;
  Utils.cells.forEach((cell) => {
    cell.classList.remove("add-player-1-symbol");
    cell.classList.remove("add-player-2-symbol");
    cell.classList.remove("horizontal-strike");
    cell.classList.remove("vertical-strike");
    cell.classList.remove("diag-left-strike");
    cell.classList.remove("diag-right-strike");
  });
  Utils.overlay.classList.toggle("overlay");
}

function playerWinner(score1, score2) {
  while (score1.textContent != 3 || score2.textContent != 3) {}
}
