import helper from "./Helpers.js";

function Input() {
  var data = {
    pressed: {},
    x: 0,
    y: 0,
    binds: helper.initBinds(),
    upbinds: helper.initBinds(),
  };

  helper.prepareDocument(data);

  const input = {
    bind: function (...args) {
      const vals = helper.extract(args);
      helper.bindHelper(data, vals, "keydown");
    },

    unbind: function (...args) {
      const vals = helper.extract(args);
      helper.unbindHelper(data, vals, "keydown");
    },

    /* eslint-disable no-unused-vars */
    upbind: function (...args) {
      const vals = helper.extract(args);
    },
    unupbind: function (...args) {
      const vals = helper.extract(args);
    },
    /* eslint-enable no-unused-vars*/

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

export default Input();
