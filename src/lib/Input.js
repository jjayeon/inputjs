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
    /* eslint-disable no-unused-vars */
    bind: function (...args) {
      const vals = helper.extract(args);

      if (vals.callback) {
        const wrappedCallback = function (e) {
          if (helper.validate(vals, e)) {
            vals.callback(e);
          }
        };

        data.binds[vals.mod][vals.key].push(wrappedCallback);
        document.addEventListener("keydown", wrappedCallback);
      }
    },
    unbind: function (...args) {
      const vals = helper.extract(args);
    },

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
