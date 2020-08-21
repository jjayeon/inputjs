const helper = {
  initBinds: function () {
    var out = {};
    for (const mod of modifiers) {
      out[mod] = {};
    }
    return out;
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
