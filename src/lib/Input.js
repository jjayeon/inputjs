export default (function () {
  // eslint-disable-next-line no-undef
  const helper = require("./Helpers.js");

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
      if (helper.bindHelper(data, vals, "keydown")) {
        return this;
      } else {
        return this.binds[vals.mod][vals.key];
      }
    },

    unbind: function (...args) {
      const vals = helper.extract(args);
      helper.unbindHelper(data, vals, "keydown");
      return this;
    },

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
