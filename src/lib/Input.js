import helper from "./Helpers.js";

function Input() {
  var data = {
    pressed: {},
    x: 0,
    y: 0,
  };

  helper.prepDoc(data);

  //eslint-disable-next-line no-unused-vars
  var binds = helper.initBinds();
  //eslint-disable-next-line no-unused-vars
  var upbinds = helper.initBinds();

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
    get binds() {
      return binds;
    },
    get upbinds() {
      return upbinds;
    },
  };

  return input;
}

export default Input;
