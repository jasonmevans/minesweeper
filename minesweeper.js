class Game {
  constructor(bombs) {
    // setup game board
    this.board = bombs.map(row => {
      return row.map(col => ({
        bomb: Boolean(col),
        value: "_"
      }));
    });
  }

  render(bombs) {
    return this.board.map(row => {
      return row.map(col => (bombs ? (col.bomb ? "B" : col.value) : col.value));
    });
  }

  boardOperation(fn) {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board[0].length; c++) {
        fn.call(this, this.board[r][c], r, c);
      }
    }
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
    const setCell = (row, col, count) => {
      this.board[row][col].value = `${count}`;
    };
    const isBomb = (row, col) => {
      return this.board[row][col].bomb;
    };
    const isRevealed = cell => {
      return cell.value !== "_";
    };
    const countBombs = (row, col) => {
      return this.cellOperation(
        row,
        col,
        (cell, r, c, v) => v + Number(cell.bomb),
        0
      );
    };

    if (isBomb(row, col)) {
      // you lose!
      this.boardOperation((cell, r, c) => {
        if (!isRevealed(cell) && !cell.bomb) {
          cell.value = `${countBombs(r, c)}`;
        }
      });
      return this.done(this.render(true));
    }

    const reveal = (row, col) => {
      const count = countBombs(row, col);
      setCell(row, col, count);
      if (count === 0) {
        this.cellOperation(row, col, (cell, r, c) => {
          if (isRevealed(cell)) return;
          if (this.inRange(r, c)) reveal(r, c);
        });
      }
    };
    reveal(row, col);

    return this.done(this.render());
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
