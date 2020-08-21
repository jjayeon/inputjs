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

  test_extract: function (helper) {
    const test = function () {
      const tests = [
        ["a"],
        ["Shift", "a"],
        [
          "a",
          () => {
            return 0;
          },
        ],
        [
          "Shift",
          "A",
          () => {
            return 0;
          },
        ],
      ];

      for (const test of tests) {
        const vals = helper.extract(test);
        console.log(
          `${test} => { mod: ${vals.mod}, key: ${vals.key}, callback: ${vals.callback}`
        );
      }
    };

    test();
  },
};

export default Tests;
