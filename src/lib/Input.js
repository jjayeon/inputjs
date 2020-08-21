function Input() {
  var data = {
    pressed: {},
    x: 0,
    y: 0,
  };

  document.addEventListener("keydown", (e) => {
    data.pressed[e.key] = true;
  });

  document.addEventListener("keyup", (e) => {
    data.pressed[e.key] = false;
  });

  document.addEventListener("mousedown", (e) => {
    data.pressed[e.button] = true;
  });

  document.addEventListener("mouseup", (e) => {
    data.pressed[e.button] = false;
  });

  document.addEventListener("mousemove", (e) => {
    data.x = e.x;
    data.y = e.y;
  });

  // var binds = {};

  const input = {
    get pressed() {
      return data.pressed;
    },
    get x() {
      return data.x;
    },
    get y() {
      return data.y;
    },
  };

  return input;
}

export default Input;
