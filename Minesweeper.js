const Gameboard = require("./Gameboard");
const Doneable = require("./Doneable");

class Minesweeper extends Doneable {
  constructor(bombs) {
    super();
    // setup game board
    this.board = new Gameboard(bombs);
  }

  move(row, col) {
    const setCell = (row, col, value) => {
      this.board.cellAt(row, col).value = value;
    };
    const isBomb = (row, col) => {
      return this.board.cellAt(row, col).bomb;
    };
    const countBombs = (row, col) => {
      return this.board.cellOp(row, col, (cell, r, c, v) => v + cell.bomb);
    };

    if (isBomb(row, col)) {
      // you lose!
      this.board.boardOp((cell, r, c) => {
        if (cell.hidden) {
          setCell(r, c, countBombs(r, c));
        }
      });
    } else {
      const reveal = (row, col) => {
        const count = countBombs(row, col);
        setCell(row, col, count);
        if (count === 0) {
          this.board.cellOp(row, col, (cell, r, c) => {
            if (cell.hidden) reveal(r, c);
          });
        }
      };
      reveal(row, col);
    }

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
