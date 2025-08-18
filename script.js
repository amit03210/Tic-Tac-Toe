// Utils data
let Utils = (function () {
  const cells = document.querySelectorAll(".cell");
  const player1Score = document.querySelector(".player-1-score .score");
  const player2Score = document.querySelector(".player-2-score .score");
  const resultAnnounce = document.querySelector(".game-result p");
  const overlay = document.querySelector(".game-finish");
  const player1Name = document.querySelector(".name1");
  const player2Name = document.querySelector(".name2");
  const formOverlay = document.querySelector(".form-overlay");
  const formButton = document.querySelector(".form-button");
  const username1 = document.querySelector("#user1");
  const username2 = document.querySelector("#user2");
  const symbolDOM = document.querySelector("#symbol");
  const newGameButton = document.querySelector(".new-game");
  let symbols;
  let isPlayer1 = true;

  function togglePlayer() {
    isPlayer1 = !isPlayer1;
  }

  function changeSymbol() {
    return (symbolDOM.value = symbolDOM.value);
  }

  let Board = function () {
    return ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  };

  let continueGameRest = () => {
    isPlayer1 = true;
  };

  let newGameReset = () => {
    isPlayer1 = true;
    username1.value = "";
    username2.value = "";
    symbolDOM.value = "X";
  };

  cells.forEach((cell, index) => cell.setAttribute("data-index", index));
  return {
    cells,
    player1Score,
    player2Score,
    resultAnnounce,
    overlay,
    isPlayer1,
    player1Name,
    player2Name,
    formOverlay,
    formButton,
    username1,
    username2,
    symbolDOM,
    symbols,
    newGameButton,
    Board,
    continueGameRest,
    togglePlayer,
    newGameReset,
    changeSymbol,
  };
})();
let gameBoard = Utils.Board();

//Events
Utils.cells.forEach((cell) => cell.addEventListener("click", gamePlay));
Utils.formButton.addEventListener("click", hideForm);
Utils.newGameButton.addEventListener("click", newGame);

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
  } else {
    //toggle Utils.isPlayer1;
    Utils.isPlayer1 = !Utils.isPlayer1;
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
function choosePlayer(symbol) {
  let player1;
  let player2;
  player1 = symbol;
  console.log(symbol);
  if (symbol == "") symbol = "X";
  let root = document.documentElement;
  root.style.setProperty("--player-1-symbol", `"${symbol.toUpperCase()}"`);
  if (symbol != "O") {
    player2 = "O";
  } else {
    player2 = "X";
  }
  root.style.setProperty("--player-2-symbol", `"${player2.toUpperCase()}"`);

  return { player1, player2 };
}

// Switching Player chance
let PlayerChance = function (pos) {
  if (Utils.isPlayer1) {
    return Player(Utils.symbols.player1, pos);
  } else {
    return Player(Utils.symbols.player2, pos);
  }
};

let gameActive = true;
//Methods
function gamePlay(e) {
  if (
    parseInt(Utils.player1Score.textContent) < 3 &&
    parseInt(Utils.player2Score.textContent) < 3
  ) {
    gameProgression(e);
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
  if (Utils.isPlayer1 && !e.classList.contains("add-player-2-symbol")) {
    e.classList.add("add-player-1-symbol");
  } else {
    if (!e.classList.contains("add-player-1-symbol"))
      e.classList.add("add-player-2-symbol");
  }
}

function addOverlay() {
  Utils.overlay.classList.add("overlay");
}

function continueGameReset() {
  Utils.continueGameRest();
  gameBoard = Utils.Board();
  Utils.cells.forEach((cell) => {
    cell.classList.remove("add-player-1-symbol");
    cell.classList.remove("add-player-2-symbol");
    cell.classList.remove("horizontal-strike");
    cell.classList.remove("vertical-strike");
    cell.classList.remove("diag-left-strike");
    cell.classList.remove("diag-right-strike");
  });
  Utils.overlay.classList.toggle("overlay");
  Utils.resultAnnounce.textContent = "Player who score 3 first will win";
}

//Complete new Game
function completeNewGame() {
  continueGameReset();
  Utils.player1Score.textContent = 0;
  Utils.player2Score.textContent = 0;
}

function winningAfterMath(x) {
  let index = 0;
  let delay = 280;
  let score1 = Utils.player1Score;
  let score2 = Utils.player2Score;

  if (!Utils.isPlayer1) {
    score1.textContent = parseInt(score1.textContent) + 1;
  } else score2.textContent = parseInt(score2.textContent) + 1;

  Utils.resultAnnounce.textContent = `${
    Utils.isPlayer1
      ? Utils.player2Name.textContent
      : Utils.player1Name.textContent
  } won ${
    score1.textContent < 3 && score2.textContent < 3 ? "this round" : "🎉"
  }`;

  if (parseInt(score1.textContent) >= 3) {
    Utils.player1Name.textContent += " 🎉";
  } else if (score2.textContent >= 3) {
    Utils.player2Name.textContent += " 🎉";
  }

  console.log(`winning combo is `, x.winningCombo);

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
}

function gameProgression(e) {
  let index = e.target.dataset.index;

  display(e.target);

  let playStats = PlayerChance(index, e.target);
  activePlayerHighlight();

  if (playStats.isWin) {
    winningAfterMath(playStats);
    if (
      parseInt(Utils.player1Score.textContent) < 3 &&
      parseInt(Utils.player2Score.textContent) < 3
    )
      setTimeout(() => continueGameReset(), 1500);

    return;
  }

  if (!gameBoard.includes("-") && !playStats.isWin) {
    addOverlay();
    console.log("Game is Draw");
    Utils.resultAnnounce.textContent = "Round Draw";
    setTimeout(() => continueGameReset(), 1500);
    gameActive = false;
  }
}

function activePlayerHighlight() {
  if (!Utils.isPlayer1) {
    Utils.player1Name.classList.remove("highlight");
    Utils.player2Name.classList.add("highlight");
  } else {
    Utils.player1Name.classList.add("highlight");
    Utils.player2Name.classList.remove("highlight");
  }
}

function hideForm(e) {
  e.preventDefault();
  Utils.formOverlay.classList.add("hidden");
  const formName1 = Utils.username1.value;
  const formName2 = Utils.username2.value;

  Utils.player1Name.textContent = formName1
    ? formName1.slice(0, 1).toUpperCase() + formName1.slice(1).toLowerCase()
    : "Player 1";
  Utils.player2Name.textContent = formName2
    ? formName2.slice(0, 1).toUpperCase() + formName2.slice(1).toLowerCase()
    : "Player 2";

  Utils.symbols = choosePlayer(Utils.symbolDOM.value);
}

function newGame() {
  completeNewGame();
  Utils.newGameReset();
  Utils.formOverlay.classList.remove("hidden");
  Utils.overlay.classList.remove("overlay");
}
