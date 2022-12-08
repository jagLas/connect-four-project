const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'moves cursor up', ConnectFour.upCommand.bind(this))
    Screen.addCommand('down', 'moves cursor down', ConnectFour.downCommand.bind(this))
    Screen.addCommand('left', 'moves cursor left', ConnectFour.leftCommand.bind(this))
    Screen.addCommand('right', 'moves cursor right', ConnectFour.rightCommand.bind(this))
    Screen.addCommand('space', 'place an X or an O', ConnectFour.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  //command functions
  static upCommand() {
    this.cursor.up();
  }

  static leftCommand() {
    this.cursor.left();
  }

  static rightCommand() {
    this.cursor.right();
  }

  static downCommand() {
    this.cursor.down();
  }


  static checkWin(grid) {
    //checks for Ties
    function checkTies(grid) {
      //finds if there is an empty square and returns false if there is one and true if there isn't
      for (let row = 0; row < grid.length; row++){
        for (let col = 0; col < grid[0].length; col++){
          let square = grid[row][col];
          if (square === ' ') {
            return false;
          }
        }
      }
      return true;
    }
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    const allOptions = [];
    allOptions.push(...this.makeRows(grid));
    allOptions.push(...this.makeColumns(grid));
    allOptions.push(...this.makeDiagonals(grid));
    allOptions.push(...this.makeBackwardsDiagonals(grid));

    let winningRow = allOptions.filter(row => {
      if (this.fourInRow(row, 'X')){
        return true;
      } else if (this.fourInRow(row, 'O')) {
        return true;
      }
    });

    if (winningRow.length === 0 && checkTies(grid)) {
      return 'T';
    } else if(winningRow.length === 0) {
      return false;
    } else if (winningRow[0].includes('X')) {
      return 'X';
    } else {
      return 'O';
    }
    
  }

  static placeMove(){
    //set the grid to display move and render screen
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    
    if (this.playerTurn === 'O') {
      this.playerTurn = 'X';
    } else {
      this.playerTurn = 'O';
    }
    Screen.setMessage(`It is Player ${this.playerTurn}'s turn`);
    Screen.render();

    //checks if there is a winner
    let winner = ConnectFour.checkWin(Screen.grid);
    if(winner){
      ConnectFour.endGame(winner);
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

  static fourInRow(array, mark){
    if (!mark) {
      throw 'missing second argument mark'
    }
    for (let i = 0; i < array.length - 3; i++) {
      const consecutive = [];

      for (let j = i; j < i + 4; j++) {
        consecutive.push(array[j]);
      }

      if (this.isSame(consecutive) && consecutive[0] === mark) {
        return mark;
      }
    }
    return false;
  }

  //checks if all elements are the same
  static isSame(array) {
    let result = array.reduce((accum, el) => {
      if (el === accum){
        return el;
      } else {
        return false;
      }
    })

    if (!result) {
      return false;
    } else{
      return true;
    }
  }

  //function to extract rows
  static makeRows (grid) {
    const rows = [];
    grid.forEach(row => rows.push(row));
    return rows;
  }

  //function to change columns to rows, then extract rows
  static makeColumns (grid) {
    const cols = [];
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let col = 0; col < numCols; col ++) {
      let column = [];

      for (let row = 0; row < numRows; row++) {
        column.push(grid[row][col]);
      }

      cols.push(column);
    }

    return cols;
  }

  //function to reverse grid
  static reverseGrid(grid) {
    const newGrid = [];
    grid.forEach(row => {
      const reverseRow = [];
      row.forEach(el => reverseRow.push(el))  //makes a copy of each row
      reverseRow.reverse(); //reverses the copy
      newGrid.push(reverseRow); //pushes reversed copy to newGrid
    })
    return newGrid;
  }

  //function to make diagonals
  static makeDiagonals (grid) {
    const diagonals = [];
    const numRows = grid.length;
    const numCols = grid[0].length;
    for (let row = 0; row < numRows - 3; row ++) {
      for (let col = 0; col < numCols - 3; col++) {
        let diagonal = [];
        for (let i = row, j = col; i < row + 4 && j < col + 4; i++, j++) {
          diagonal.push(grid[i][j]);
        }
        diagonals.push(diagonal);
      }
    }
    return diagonals;
  }

  //use diagonal function on reversed grid
  static makeBackwardsDiagonals(grid) {
    const reversedGrid = this.reverseGrid(grid);
    return this.makeDiagonals(reversedGrid);
  }
  //check all of the above in the checkFourFunction

}

module.exports = ConnectFour;
