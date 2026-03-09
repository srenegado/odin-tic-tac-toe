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

  const getMark = () => mark;

  return {makeMove, getMark};
}

const GameController = (() => {

  const Gameboard = (() => {
    const n = 3;

    const gameboard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    const forEach = (callback) => {
      gameboard.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => callback(element, rowIndex, colIndex));
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
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
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
      Gameboard.forEach((entry, rowIndex, colIndex) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("gameboard-entry");
        entryDiv.textContent = entry;
        entryDiv.dataset.id = `${rowIndex}${colIndex}`;
        gameboardGrid.appendChild(entryDiv);
      })
    };

    const clear = () => {
      while (gameboardGrid.firstChild) {
        gameboardGrid.removeChild(gameboardGrid.firstChild);
      }
    }

    return {render, clear};
  })(Gameboard);
  
  const Player1 = createPlayer(Gameboard, 1);
  const Player2 = createPlayer(Gameboard, 2);

  const Turn = Object.freeze({P1: "P1", P2: "P2"});
  let currTurn = Turn.P1;

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

  const setUpPlayerClickEvents = () => {
    const gameboardEntries = document.querySelectorAll(".gameboard-entry");
    
    gameboardEntries.forEach((entryDiv) => {
      const canBeMarked = entryDiv.textContent === ' ';

      if (canBeMarked) {
        entryDiv.addEventListener("click", (e) => {
          const rowIndex = e.target.dataset.id[0];
          const colIndex = e.target.dataset.id[1];

          if (currTurn === Turn.P1) {
            e.target.textContent = Player1.getMark();
            Player1.makeMove(rowIndex, colIndex);
            currTurn = Turn.P2;
          } else if (currTurn === Turn.P2) {
            e.target.textContent = Player2.getMark();
            Player2.makeMove(rowIndex, colIndex);
            currTurn = Turn.P1;
          }

          const Status = getStatus();

          if (Status.isOver) {
            if (Status.draw) {
              console.log("It's a draw!");
            } else {
              console.log(`${Status.winner} wins!`);
            }
          } else {
            console.log("Game is still playing...");
          }
        });
      }
    });
  }

  const start = () => {
    DisplayController.render();
    setUpPlayerClickEvents();
  };

  return {start};
})();

GameController.start();