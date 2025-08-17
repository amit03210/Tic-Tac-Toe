let Board = (function(){
    return ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
})()

let gameBoard = Board;
let isPlayer1 = true;
let position;
let Player = function(pSym, index){
    
    if(index <0 || index >=gameBoard.length){
        return "Out of Bound Error"
    }

    let winningCondition = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    // let randomize = Math.floor(Math.random() * winningCondition.length);
    // winningCondition[randomize].forEach(x => gameBoard[x] = pSym);

    //Setting the marker;
    gameBoard[index] = pSym;

    console.log(`Board Set to ${pSym} at ${index}`);
    
    let count = 0;
    for(let i=0; i<3;i++){
        let result = "";
        for(j = 0; j<3; j++){
            result += gameBoard[count++] + "    ";
        }
        console.log(result);
    }


    let isWin = winningCondition.map(arr => {
        return arr.every(i => gameBoard[i] === pSym);
    }).some(x => x === true);

    /*
    To find the index of Condition here indexOf will always return -1, because .map returns a new array of booleans, like [false, false, true, false, ...].
    But indexOf check for Exact copy since indexOf uses strict equality (===)
    if(isWin){
        console.log(winningCondition[winningCondition.indexOf(winningCondition.map(arr => arr.every(i => gameBoard[i] === pSym)))])
    }
    */
    let winningCombo = null;
    for (let combo of winningCondition) {
        if (combo.every(i => gameBoard[i] === pSym)) {
            winningCombo = combo;
            break;
        }
    }
    if (winningCombo) {
        console.log(`Winning combination: ${winningCombo}`);
    }

    return {isWin, pSym};
}


// First Time Choosing Player
let choosePlayer = (function (choose){
    let player1;
    let player2;

    player1 = choose;
    if(choose != 'o'){
        player2 = 'o';
    }else{
        player2 = 'x';
    }

    return {player1, player2};
})(prompt('Choose Symbol for Player 1'));

// Switching Player chance
let PlayerChance = function(pos){
    if(isPlayer1){
        isPlayer1 = false;
        return Player(choosePlayer.player1, pos);
    }else{
        isPlayer1 = true;
        return Player(choosePlayer.player2, pos);
    }
}

let gameActive = true;
while(gameActive){
    position = parseInt(prompt(`Enter the Position for ${isPlayer1? choosePlayer.player1 : choosePlayer.player2}`));
    if(position === 99)
        break;
    let x = PlayerChance(position);

    if (x.isWin) {
        alert(`${x.pSym} wins!`);
        break;
    }

    if(!gameBoard.includes('-') && !x.isWin){
        console.log( 'Game is Draw');
        gameActive = false;
    }
}

