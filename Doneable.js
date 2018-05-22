module.exports = class Doneable {
  done(state) {
    const ctx = this;
    return {
      then(fn) {
        return fn.apply(ctx, state);
      }
    };
  }
};
