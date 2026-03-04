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
    const n = 3;

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
      for (let i = 0; i < n; i++) {
        colStr += gameboard[i][j];
      }
      return colStr;
    };

    const getDiag = (diag) => {
      if (diag == 0) {
        return gameboard[0][0] + gameboard[1][1] + gameboard[2][2];
      } else if (diag == 1) {
        return gameboard[0][2] + gameboard[1][1] + gameboard[2][0];
      }
    };

    const getSize = () => n;

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

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1; j++) {
          gameboardStr += gameboard[i][j] + "|";
        }
        gameboardStr += gameboard[i][n - 1] + "\n";
      }

      console.log(gameboardStr);
    };

    return {forEach, getSpace, getRow, getCol, getDiag, getSize, markSpace, clear, print};
  })();

  const DisplayController = ((Gameboard) => {
    const gameboardGrid = document.querySelector(".gameboard-grid");

    const render = () => {
      Gameboard.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("gameboard-entry");
        entryDiv.textContent = entry;
        gameboardGrid.appendChild(entryDiv);
      })
    };

    return {render};
  })(Gameboard);


  const Player1 = createPlayer(Gameboard, 1);
  const Player2 = createPlayer(Gameboard, 2);

  const getStatus = () => {
      let winner = "No winner";
      let isOver = false;
      let draw = false;

      const n = Gameboard.getSize();
      const numOfDiags = 2;

      for (let i = 0; i < n; i++) {
        const row = Gameboard.getRow(i);
        const col = Gameboard.getCol(i);
        if (row === "xxx" || col === "xxx") {
          winner = "Player 1";
          isOver = true;
          break;
        } else if (row === "ooo" || col === "ooo") {
          winner = "Player 2"
          isOver = true;
          break;
        }
      }

      for (let i = 0; i < numOfDiags; i++) {
        const diag = Gameboard.getDiag(i)
        if (diag === "xxx") {
          winner = "Player 1";
          isOver = true;
          break;
        } else if (diag === "ooo") {
          winner = "Player 2";
          isOver = true;
          break;
        }
      }

      if (winner === "No winner") {
        isOver = true;
        draw = true;
        Gameboard.forEach((entry) => {
          if (entry === " ") {
            isOver = false;
            draw = false;
          }
        });
      }

      return {winner, isOver, draw};
    }

  const startGame = () => {

    Player1.makeMove(1, 1);
    Player2.makeMove(2, 0);
    Player1.makeMove(2, 1);
    Player2.makeMove(0, 1);
    Player1.makeMove(2, 2);
    Player2.makeMove(0, 0);
    Player1.makeMove(0, 2);
    Player2.makeMove(1, 2);
    Player1.makeMove(1, 0);

    DisplayController.render();
    Gameboard.print();

    const Status = getStatus();
    if (Status.isOver) {
      if (Status.draw) {
        console.log("It's a draw!");
      } else {
        console.log(`${Status.winner} wins!`);
      }
    } else {
      console.log("Game is still being played");
    }
  };

  return {startGame};
})();

Game.startGame();