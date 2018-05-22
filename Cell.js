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
    return ` ${this.value}`;
  }
  render() {
    if (this.hidden) {
      if (this.flagged) {
        return "FF";
      }
      return "##";
    }
    if (this.bomb) {
      return "BB";
    }
    return this.value === 0 ? "  " : this.icon;
  }
};
