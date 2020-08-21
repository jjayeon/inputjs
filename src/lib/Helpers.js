// eslint-disable-next-line no-undef
module.exports = {
  initBinds: function () {
    var out = { None: {} };
    for (const mod of this.modifiers) {
      out[mod] = {};
    }
    return out;
  },

  prepareDocument: function (data) {
    document.addEventListener("keydown", (e) => {
      data.pressed[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      data.pressed[e.key] = false;
    });

    document.addEventListener("mousedown", (e) => {
      data.pressed[this.mouseButtons[e.button]] = true;
    });

    document.addEventListener("mouseup", (e) => {
      data.pressed[this.mouseButtons[e.button]] = false;
    });

    document.addEventListener("mousemove", (e) => {
      data.x = e.x;
      data.y = e.y;
    });
  },

  extract: function (args) {
    var mod = "None",
      key,
      callback;
    if (args.length === 1) {
      key = args[0];
    } else if (args.length === 2) {
      if (typeof args[1] === "function") {
        key = args[0];
        callback = args[1];
      } else {
        mod = args[0];
        key = args[1];
      }
    } else if (args.length === 3) {
      mod = args[0];
      key = args[1];
      callback = args[2];
    }
    return { mod, key, callback };
  },

  bindHelper: function (data, vals, event) {
    function validate(vals, e) {
      return (
        vals.key === e.key &&
        (vals.mod === "None" ||
          (vals.mod === "Shift" && e.shiftKey) ||
          (vals.mod === "Control" && e.ctrlKey) ||
          (vals.mod === "Meta" && e.metaKey) ||
          (vals.mod === "Alt" && e.altKey))
      );
    }

    // initialize if list doesn't exist
    if (!data.binds[vals.mod][vals.key]) {
      data.binds[vals.mod][vals.key] = [];
    }

    if (vals.callback) {
      const wrappedCallback = function (e) {
        if (validate(vals, e)) {
          vals.callback(e);
        }
      };

      data.binds[vals.mod][vals.key].push(wrappedCallback);
      document.addEventListener(event, wrappedCallback);

      return true;
    } else {
      return false;
    }
  },

  unbindHelper: function (data, vals, event) {
    const callbacks = data.binds[vals.mod][vals.key];
    if (!callbacks) {
      data.binds[vals.mod][vals.key] = [];
    } else {
      while (callbacks.length > 0) {
        const callback = callbacks.pop();
        document.removeEventListener(event, callback);
      }
    }
  },

  mouseButtons: ["MouseLeft", "MouseMiddle", "MouseRight"],
  modifiers: ["Alt", "Control", "Meta", "Shift"],
};
