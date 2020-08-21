// The app itself!
// Most of the heavy lifting is in Helpers.js.
// This file should be legible, but a little mysterious.
// Like me.

// Note: this module uses the immediately-invoked-function pattern.
export default (function () {
  // eslint-disable-next-line no-undef
  const helper = require("./Helpers.js");

  // All the state variables we need to keep track of.
  var data = {
    x: 0,
    y: 0,
    // pressed is just a hash of key:boolean.
    pressed: {},
    // binds is more complicated.
    // we're storing the data as something like...
    // { modifier: { key: [callback1 callback2] } }
    // so the binds for A are in data.binds["None"]["a"],
    // and the binds for Shift B are in data.binds["Shift"]["B"].
    binds: helper.initBinds(),
    upbinds: helper.initBinds(),
  };

  // A note on Shift and CapsLock:
  // Because of the way we've written this,
  // All "Shift" binds should use the "Shift"-ed version of the character.
  // ex. bind("Shift", "A") is good,
  // but bind("Shift", "a") is not.
  // bind("Shift", "a") is only accessible if "a" is fired while "Shift" is held down,
  // which will only happen when CapsLock is active.
  // bind("Shift", "1") will never fire at all ---
  // use bind("Shift", "!") instead.

  // Binds the necessary eventListeners to update data.
  helper.prepareDocument(data);

  const input = {
    // bind is weird.
    // bind(str) should return the functions at that key.
    // bind(str, str) should return the functions at that modifier + key.
    // bind(str, func) should bind func to that key.
    // bind(str, str, func) should do the same, bu with a modifier key.
    bind: function (...args) {
      const vals = helper.extract(args);
      if (helper.bindHelper(data, vals, "keydown")) {
        return this;
      } else {
        return this.binds[vals.mod][vals.key];
      }
    },

    // same as bind, but removes all binds on that key.
    unbind: function (...args) {
      const vals = helper.extract(args);
      helper.unbindHelper(data, vals, "keydown");
      return this;
    },

    // similar functions for keyups.
    upbind: function (...args) {
      const vals = helper.extract(args);
      if (helper.bindHelper(data, vals, "keyup")) {
        return this;
      } else {
        return this.binds[vals.mod][vals.key];
      }
    },
    unupbind: function (...args) {
      const vals = helper.extract(args);
      helper.unbindHelper(data, vals, "keyup");
      return this;
    },

    // assorted getters for data.
    // data should not be directly accessible!
    get pressed() {
      return data.pressed;
    },
    get x() {
      return data.x;
    },
    get y() {
      return data.y;
    },
    get binds() {
      return data.binds;
    },
    get upbinds() {
      return data.upbinds;
    },
  };

  return input;
})();
