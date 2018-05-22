const Cell = require("./Cell");

module.exports = class Gameboard {
  constructor(bombs) {
    this.cells = bombs.map(row => {
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

  cellAt(row, col) {
    return this.cells[row][col];
  }

  get width() {
    return this.cells[0].length;
  }
  get height() {
    return this.cells.length;
  }

  boardOp(fn, value = null) {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        value = fn.call(this, this.cellAt(r, c), r, c, value);
      }
    }
    return value;
  }

  cellOp(row, col, fn, value = null) {
    for (let r = row - 1; r <= row + 1; r++) {
      if (!this.inRange(r, null)) continue;
      for (let c = col - 1; c <= col + 1; c++) {
        if (!this.inRange(null, c)) continue;
        value = fn.call(this, this.cellAt(r, c), r, c, value);
      }
    }
    return value;
  }

  inRange(row, col) {
    const rowRange = r => r >= 0 && r < this.height;
    const colRange = c => c >= 0 && c < this.width;
    if (row === null) {
      return colRange(col);
    } else if (col === null) {
      return rowRange(row);
    }
    return rowRange(row) && colRange(col);
  }

  render() {
    const columns = Array.from(Array(this.width), (i, n) =>
      n.toLocaleString("en-US", { minimumIntegerDigits: 2 })
    );
    return [
      columns,
      ...this.cells.map((row, r) => {
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
          return col.icon + " ";
        });
      }),
      columns
    ].map((row, r) => {
      const n =
        r === 0 || r - 1 === this.height
          ? "--"
          : (r - 1).toLocaleString("en-US", { minimumIntegerDigits: 2 });
      return [n, ...row, n];
    });
  }
};
