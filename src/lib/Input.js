import helper from "./Helpers.js";

function Input() {
  var data = {
    pressed: {},
    x: 0,
    y: 0,
    binds: helper.initBinds(),
    upbinds: helper.initBinds(),
  };

  // meaning "prepare document."
  helper.prepDoc(data);

  const input = {
    bind: function (...args) {}, // eslint-disable-line no-unused-vars
    unbind: function (...args) {}, // eslint-disable-line no-unused-vars

    upbind: function (...args) {}, // eslint-disable-line no-unused-vars
    unupbind: function (...args) {}, // eslint-disable-line no-unused-vars

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
}

export default Input;
