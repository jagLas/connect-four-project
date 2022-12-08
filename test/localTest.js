const ConnectFour = require("../class/connect-four");

let array1 = ['X',' ','O','O', 'O', 'O'];

debugger
// console.log(ConnectFour.checkFour(array1, 'X'));
// console.log(ConnectFour.isSame(array1))
// console.log(ConnectFour.fourInRow(array1, 'O'))

grid =[
[' ','X','X',' ',' ',' ',' '],
[' ',' ',' ',' ','O',' ',' '],
['X','O',' ',' ',' ',' ',' '],
[' ','O','X',' ',' ',' ',' '],
[' ',' ',' ',' ',' ',' ',' '],
[' ',' ',' ',' ',' ',' ',' ']
];

// console.log(ConnectFour.makeRows(grid));
console.log(ConnectFour.makeColumns(grid))
