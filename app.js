const Minesweeper = require("./minesweeper");

const bombs = [
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
];

const game = new Minesweeper(bombs);

function log() {
  console.clear();
  console.log(
    this.render()
      .map(line => line.join(" "))
      .join("\n")
  );
  console.log(
    `Score: ${this.score}/${this.score.total}, ${this.score.win && "Win!"}`
  );
}

game.move(0, 3).then(log);
game.move(3, 0).then(log);
game.move(0, 0).then(log);
game.move(5, 5).then(log);
game.move(2, 0).then(log);
game.move(2, 2).then(log);
game.move(2, 3).then(log);
game.move(2, 4).then(log);
game.move(2, 6).then(log);
game.move(0, 4).then(log);
game.move(0, 6).then(log);
game.flag(3, 3).then(log);
game.flag(3, 4).then(log);
game.move(0, 1).then(log);
game.move(1, 2).then(log);
game.flag(0, 2).then(log);
game.move(0, 17).then(log);
// game.move(7, 7).then(log);
