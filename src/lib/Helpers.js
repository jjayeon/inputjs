const helper = {
  initBinds: function () {
    var out = { None: {} };
    for (const mod of modifiers) {
      out[mod] = {};
    }
    return out;
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

    if (
      typeof mod === "string" &&
      typeof key === "string" &&
      (callback === undefined || typeof callback === "function")
    ) {
      return { mod, key, callback };
    } else {
      throw new TypeError(
        'a "bind" function was called with invalid parameters.'
      );
    }
  },

  validate: function (vals, e) {
    return (
      vals.key === e.key &&
      (vals.mod === "None" ||
        (vals.mod === "Shift" && e.shiftKey) ||
        (vals.mod === "Control" && e.ctrlKey) ||
        (vals.mod === "Meta" && e.metaKey) ||
        (vals.mod === "Alt" && e.altKey))
    );
  },

  mouseButton: function (index) {
    return mouseButtons[index];
  },

  prepDoc: function (data) {
    document.addEventListener("keydown", (e) => {
      data.pressed[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      data.pressed[e.key] = false;
    });

    document.addEventListener("mousedown", (e) => {
      data.pressed[this.mouseButton(e.button)] = true;
    });

    document.addEventListener("mouseup", (e) => {
      data.pressed[this.mouseButton(e.button)] = false;
    });

    document.addEventListener("mousemove", (e) => {
      data.x = e.x;
      data.y = e.y;
    });
  },
};

const mouseButtons = ["MouseLeft", "MouseMiddle", "MouseRight"];
const modifiers = ["Alt", "Control", "Meta", "Shift"];

export default helper;
