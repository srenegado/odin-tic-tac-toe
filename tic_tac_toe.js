const Gameboard = (() => {
  const rows = 3;
  const cols = 3;

  const gameboard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  const get = (i, j) => {
    return gameboard[i][j];
  };

  const markSpace = (i, j, mark) => {
    gameboard[i][j] = mark;
  }

  const clearBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gameboard[i][j] = ' ';
      }
    }
  }

  const print = () => {
    let gameboardStr = ""; 

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        gameboardStr += gameboard[i][j] + "|";
      }
      gameboardStr += gameboard[i][cols - 1] + "\n";
    }

    console.log(gameboardStr);
  }

  return {get, markSpace, clearBoard, print};
})();


function createPlayer() {
  
  return {};
}

function createGame() {
  
  return {};
}

Gameboard.print();