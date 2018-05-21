module.exports = class Doneable {
  done(state) {
    return Promise.resolve(this, state);
  }
};
