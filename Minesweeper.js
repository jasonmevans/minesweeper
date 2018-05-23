const Gameboard = require('./Gameboard');
const Doneable = require('./Doneable');

class Minesweeper extends Doneable {
  constructor(bombs) {
    super();
    // setup game board
    this.board = new Gameboard(bombs);
  }

  move(row, col) {

    // ...

    return this.done();
  }

  flag(row, col) {
    this.board.cellAt(row, col).flagged = true;
    return this.done();
  }

  get bombCount() {
    return this.board.boardOp((cell, r, c, v) => v + cell.bomb);
  }

  get score() {
    const ctx = this;
    class Score extends Number {
      get total() {
        return ctx.bombCount;
      }
      get win() {
        return +this === this.total;
      }
    }
    return new Score(
      this.board.boardOp((cell, r, c, s) => s + (cell.bomb && cell.flagged))
    );
  }
}

module.exports = Minesweeper;
