const BLANK_CELL = "🔲";
const MARKED_CELL = "⚠️";
const BOOM = "💥";
const NUMBERS = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];

class Cell {
  constructor({ value, bomb, flagged }) {
    this.value = value;
    this.bomb = bomb;
    this.flagged = flagged;
  }
  get hidden() {
    return this.value === null;
  }
  get icon() {
    return NUMBERS[this.value];
  }
}

class Game {
  constructor(bombs) {
    // setup game board
    this.board = bombs.map(row => {
      return row.map(
        col =>
          new Cell({
            bomb: Boolean(col),
            flagged: false,
            value: null
          })
      );
    });
  }

  render() {
    return this.board.map(row => {
      return row.map(col => {
        if (col.hidden) {
          if (col.flagged) {
            return MARKED_CELL + " ";
          }
          return BLANK_CELL;
        }
        if (col.bomb) {
          return BOOM;
        }
        return col.icon;
      });
    });
  }

  boardOperation(fn, value) {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board[0].length; c++) {
        value = fn.call(this, this.board[r][c], r, c, value);
      }
    }
    return value;
  }

  cellOperation(row, col, fn, value = null) {
    for (let r = row - 1; r <= row + 1; r++) {
      if (!this.inRange(r, null)) continue;
      for (let c = col - 1; c <= col + 1; c++) {
        if (!this.inRange(null, c)) continue;
        value = fn.call(this, this.board[r][c], r, c, value);
      }
    }
    return value;
  }

  inRange(row, col) {
    const rowRange = r => r >= 0 && r < this.board.length;
    const colRange = c => c >= 0 && c < this.board[0].length;
    if (row === null) {
      return colRange(col);
    } else if (col === null) {
      return rowRange(row);
    }
    return rowRange(row) && colRange(col);
  }

  move(row, col) {
    const setCell = (row, col, value) => {
      this.board[row][col].value = value;
    };
    const isBomb = (row, col) => {
      return this.board[row][col].bomb;
    };
    const countBombs = (row, col) => {
      return this.cellOperation(row, col, (cell, r, c, v) => v + cell.bomb, 0);
    };

    if (isBomb(row, col)) {
      // you lose!
      this.boardOperation((cell, r, c) => {
        if (cell.hidden) {
          setCell(r, c, countBombs(r, c));
        }
      });
    } else {
      const reveal = (row, col) => {
        const count = countBombs(row, col);
        setCell(row, col, count);
        if (count === 0) {
          this.cellOperation(row, col, (cell, r, c) => {
            if (cell.hidden) reveal(r, c);
          });
        }
      };
      reveal(row, col);
    }

    return this.done();
  }

  flag(row, col) {
    this.board[row][col].flagged = true;
    return this.done();
  }

  get bombCount() {
    return this.boardOperation((cell, r, c, v) => v + cell.bomb, 0);
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
      this.boardOperation((cell, r, c, s) => s + (cell.bomb && cell.flagged), 0)
    );
  }

  done(state) {
    const ctx = this;
    return {
      then(fn) {
        fn.call(ctx, state);
      }
    };
  }
}

module.exports = Game;
