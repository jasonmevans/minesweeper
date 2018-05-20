const Minesweeper = require("./minesweeper");

const bombs = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

const game = new Minesweeper(bombs);

const log = state => {
  console.clear();
  console.log(state.map(line => line.join("\t")).join("\n"));
  // console.table(state);
};

game.render().then(log);
game.move(0, 3).then(log);
game.move(3, 0).then(log);
game.move(0, 0).then(log);
game.move(5, 5).then(log);
game.move(2, 0).then(log);
game.move(2, 2).then(log);
game.move(2, 3).then(log);
game.move(2, 4).then(log);
game.move(2, 6).then(log);
game.move(0, 6).then(log);
game.mark(3, 3).then(log);
game.mark(3, 4).then(log);
game.move(0, 1).then(log);
game.mark(0, 2).then(log);
