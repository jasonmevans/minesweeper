const Minesweeper = require("./minesweeper");

// [0, 1, 0, 0],
// [0, 1, 1, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 1]
const bombs = [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 1]];

const game = new Minesweeper(bombs);

const log = state => console.log(state);

game.move(0, 3).then(log);
game.move(3, 0).then(log);
game.move(0, 0).then(log);
game.move(3, 3).then(log);
