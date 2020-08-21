const Tests = {
  test_pressed: function (input) {
    document.addEventListener("keydown", () => {
      for (const key in input.pressed) {
        if (input.pressed[key]) {
          console.log(key + " pressed");
        }
      }
    });
  },
};

export default Tests;
