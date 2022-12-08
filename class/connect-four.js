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

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

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
      console.log(consecutive)
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
    let cols = [];
    let numRows = grid.length;
    let numCols = grid[0].length;
    console.log(numRows, numCols)

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

  //function to make diagonals

  //use diagonal function on reversed grid

  //check all of the above in the checkFourFunction

}

module.exports = ConnectFour;
