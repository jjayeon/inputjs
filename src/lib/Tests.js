const Tests = {
  test_pressed: function (input, active) {
    function getAllPressed() {
      var out = "pressed: ";
      for (const key in input.pressed) {
        if (input.pressed[key]) {
          out += key + ", ";
        }
      }
      console.log(out);
    }
    if (active) {
      document.addEventListener("keydown", getAllPressed);
      document.addEventListener("mousedown", getAllPressed);
    } else {
      document.removeEventListener("keydown", getAllPressed);
      document.removeEventListener("mousedown", getAllPressed);
    }
  },

  test_xy: function (input, active) {
    function logPosition(e) {
      console.log(`doc says: ${e.x}, ${e.y}`);
      console.log(`input says: ${input.x}, ${input.y}`);
    }

    if (active) {
      document.addEventListener("mousedown", logPosition);
    } else {
      document.removeEventListener("mousedown", logPosition);
    }
  },
};

export default Tests;
