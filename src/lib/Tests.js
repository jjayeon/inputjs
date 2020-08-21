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

  test_validate: function (helper) {
    const tests = [
      { vals: { mod: "None", key: "a" }, e: { key: "a" } },
      { vals: { mod: "Shift", key: "a" }, e: { shiftKey: true, key: "a" } },
      { vals: { mod: "Control", key: "a" }, e: { ctrlKey: true, key: "a" } },
      { vals: { mod: "Control", key: "a" }, e: { ctrlKey: true, key: "b" } },
      { vals: { mod: "None", key: "a" }, e: { metaKey: false, key: "b" } },
      { vals: { mod: "Shift", key: "a" }, e: { ctrlKey: true, key: "a" } },
    ];

    for (const test of tests) {
      console.log(`vals: ${test.vals.mod} ${test.vals.key}`);
      console.log(`e: ${Object.keys(test.e)} ${test.e.key}`);
      console.log(`result: ${helper.validate(test.vals, test.e)}`);
    }
  },

  test_bind: function (input) {
    input.bind("a", () => {
      console.log("pushed a");
    });
    input.bind("Shift", "A", () => {
      console.log("pushed A");
    });
    input.bind("b", (e) => {
      console.log("key is " + e.key);
    });
    input.bind("Shift", "B", (e) => {
      console.log("key is " + e.key + "(shift)");
    });
  },
};

export default Tests;
