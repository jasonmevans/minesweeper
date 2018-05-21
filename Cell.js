const NUMBERS = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];

module.exports = class Cell {
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
};
