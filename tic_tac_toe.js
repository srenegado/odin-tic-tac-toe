function createPlayer(Gameboard, playerNumber) {
  let mark = "";

  switch (playerNumber) {
    case 1:
      mark = "x";
      break;
    case 2:
      mark = "o";
      break;
  }

  const makeMove = (i, j) => {
    Gameboard.markSpace(i, j, mark);
  }

  return {makeMove};
}

const Game = (() => {

  const Gameboard = (() => {
    const rows = 3;
    const cols = 3;

    const gameboard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    const forEach = (callback) => {
      gameboard.forEach((row) => {
        row.forEach(callback);
      });
    };

    const getSpace = (i, j) => {
      return gameboard[i][j];
    };

    const getRow = (i) => {
      let rowStr = "";
      gameboard[i].forEach(entry => {
        rowStr += entry;
      });
      return rowStr;
    };

    const getCol = (j) => {
      let colStr = "";
      for (let i = 0; i < rows; i++) {
        colStr += gameboard[i][j];
      }
      return colStr;
    };

    const getDiag = (diag) => {
      if (diag == 0) {
        return gameboard[0][0] + gameboard[1][1] + gameboard[2][2];
      } else if (diag == 1) {
        return gameboard[0][2] + gameboard[1][1] + gameboard[0][2];
      }
    }

    const markSpace = (i, j, mark) => {
      gameboard[i][j] = mark;
    };

    const clear = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          gameboard[i][j] = ' ';
        }
      }
    };

    const print = () => {
      let gameboardStr = ""; 

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - 1; j++) {
          gameboardStr += gameboard[i][j] + "|";
        }
        gameboardStr += gameboard[i][cols - 1] + "\n";
      }

      console.log(gameboardStr);
    };

    return {forEach, getSpace, getRow, getCol, getDiag, markSpace, clear, print};
  })();

  const Player1 = createPlayer(Gameboard, 1);
  const Player2 = createPlayer(Gameboard, 2);

  const startGame = () => {

    Player1.makeMove(1, 1);
    Player2.makeMove(1, 0);
    Player1.makeMove(0, 1);
    Player2.makeMove(1, 2);
    Player1.makeMove(2, 1);

    Gameboard.print();

    Gameboard.clear();
    Gameboard.print();
  };

  return {startGame};
})();

Game.startGame();