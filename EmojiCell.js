const Cell = require('./Cell');

const NUMBERS = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
const BLANK_CELL = '🔲';
const MARKED_CELL = '⚠️';
const BOOM = '💥';

module.exports = class EmojiCell extends Cell {
  get icon() {
    return NUMBERS[this.value];
  }
  render() {
    if (this.hidden) {
      if (this.flagged) {
        return MARKED_CELL + ' ';
      }
      return BLANK_CELL;
    }
    if (this.bomb) {
      return BOOM;
    }
    return this.value === 0 ? '  ' : this.icon + ' ';
  }
};
