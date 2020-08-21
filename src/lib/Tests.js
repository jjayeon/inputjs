const Tests = {
  test_pressed: function (input, testing) {
    function getAllPressed() {
      var out = "pressed: ";
      for (const key in input.pressed) {
        if (input.pressed[key]) {
          out += key + ", ";
        }
      }
      console.log(out);
    }
    if (testing) {
      document.addEventListener("keydown", getAllPressed);
    } else {
      document.removeEventListener("keydown", getAllPressed);
    }
  },
};

export default Tests;
