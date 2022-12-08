const { makeDiagonals, reverseGrid, makeBackwardsDiagonals } = require("../class/connect-four");
const ConnectFour = require("../class/connect-four");

let array1 = ['X',' ','O','O', 'O', 'O'];


// console.log(ConnectFour.isSame(array1))
// console.log(ConnectFour.fourInRow(array1, 'O'))

grid =[
[' ','X','X',' ',' ',' ',' '],
[' ',' ','O',' ','O',' ',' '],
['X','O',' ','O',' ',' ','X'],
[' ','O','X',' ','O','X',' '],
[' ',' ',' ',' ','X','O',' '],
[' ',' ',' ','X',' ',' ',' ']
];

console.log(ConnectFour.makeRows(grid));
console.log(ConnectFour.makeColumns(grid))
// console.log(ConnectFour.reverseGrid(grid))
// console.log(grid);
debugger
console.log(ConnectFour.makeDiagonals(grid));
console.log(ConnectFour.makeBackwardsDiagonals(grid));