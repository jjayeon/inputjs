// This is where I hid all the complicated stuff.

const mouseButtons = ["mouseleft", "mousemiddle", "mouseright"];
const modifiers = ["Alt", "Control", "Meta", "Shift"];

// eslint-disable-next-line no-undef
module.exports = {
  // returns something like:
  // { None: {}, Alt: {}, Control: {}, Meta: {}, Shift: {} }
  initBinds: function () {
    var out = { None: {} };
    for (const mod of modifiers) {
      out[mod] = {};
    }
    return out;
  },

  // assigns some keybinds to the document to update data.
  // note that data is passed by reference,
  // so the original data in Input.js is modified.
  prepareDocument: function (data) {
    document.addEventListener("keydown", (e) => {
      data.pressed[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      data.pressed[e.key] = false;
    });

    document.addEventListener("mousedown", (e) => {
      data.pressed[mouseButtons[e.button]] = true;
    });

    document.addEventListener("mouseup", (e) => {
      data.pressed[mouseButtons[e.button]] = false;
    });

    document.addEventListener("mousemove", (e) => {
      data.x = e.x;
      data.y = e.y;
    });
  },

  // takes some args from bind() and returns an object with nice references.
  // essentially just a fancy switch block.
  extract: function (args) {
    var mod = "None",
      key,
      callback;

    switch (args.length) {
      case 1:
        key = args[0];
        break;

      case 2:
        if (typeof args[1] === "function") {
          key = args[0];
          callback = args[1];
        } else {
          mod = args[0];
          key = args[1];
        }
        break;

      case 3:
        mod = args[0];
        key = args[1];
        callback = args[2];
        break;
    }
    return { mod, key, callback };
  },

  // this function has the bulk of the logic for bind().
  // it's abstracted out like this so that we can use it for both bind() and upbind().
  // again, "data" is passed by reference --- important!
  // "dry" is a flag for a dry run, i.e. no event listeners, used for unit testing.
  bindHelper: function (data, vals, event, dry = false) {
    // validate returns true if the event e matches the values in vals.
    // ex. if vals.mod === "Shift" and vals.key === "a",
    // validate will return true iff e.key === "a" and e.shiftKey === true.
    function validate(vals, e) {
      return (
        (vals.key === "mousemove" ||
          vals.key === mouseButtons[e.button] ||
          vals.key === e.key) &&
        (vals.mod === "None" ||
          (vals.mod === "Shift" && e.shiftKey) ||
          (vals.mod === "Control" && e.ctrlKey) ||
          (vals.mod === "Meta" && e.metaKey) ||
          (vals.mod === "Alt" && e.altKey))
      );
    }

    // check which way we're binding.
    var binds;
    if (event === "down") {
      binds = data.binds;
    } else if (event === "up") {
      binds = data.upbinds;
    }
    // this function will brick entirely if called with anything besides "up" or "down".
    // which is by design.

    // initialize any keys that don't exist.
    if (!binds[vals.mod][vals.key]) {
      binds[vals.mod][vals.key] = [];
    }

    // if bind was called with a function, do this.
    if (vals.callback) {
      const wrappedCallback = function (e) {
        if (validate(vals, e)) {
          vals.callback(e);
        }
      };

      // intelligently find the event type.
      var type;
      if (vals.key === "mousemove") {
        type = "mousemove";
      } else if (mouseButtons.includes(vals.key)) {
        type = "mouse" + event;
      } else {
        type = "key" + event;
      }

      binds[vals.mod][vals.key].push(wrappedCallback);
      !dry && document.addEventListener(type, wrappedCallback);

      return true;
      // otherwise, return false, signalling to Input.js to return the callbacks.
    } else {
      return false;
    }
  },

  // As you can imagine, a helper function for unbind.
  // Takes the same parameters as above.
  unbindHelper: function (data, vals, event, dry = false) {
    // intelligently find the event type.
    var type;
    if (vals.key === "mousemove") {
      type = "mousemove";
    } else if (mouseButtons.includes(vals.key)) {
      type = "mouse" + event;
    } else {
      type = "key" + event;
    }

    // check which way we're binding.
    var binds;
    if (event === "down") {
      binds = data.binds;
    } else if (event === "up") {
      binds = data.upbinds;
    }

    // callbacks is also just a reference.
    const callbacks = binds[vals.mod][vals.key];
    if (callbacks) {
      // pop and remove each callback.
      while (callbacks.length > 0) {
        const callback = callbacks.pop();
        !dry && document.removeEventListener(type, callback);
      }
    }
  },
};
