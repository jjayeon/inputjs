import input from "./lib/Input.js"; // eslint-disable-line no-unused-vars
import tests from "./lib/Tests.js"; // eslint-disable-line no-unused-vars

const app = document.getElementById("app");

var space = document.createElement("p");
space.innerHTML = "Press space to enable/disable RGB.";
app.appendChild(space);

var RGB = document.createElement("p");
RGB.innerHTML = "Press RGB to change colors!";
app.appendChild(RGB);

var shift = document.createElement("p");
shift.innerHTML = "Use Shift to control these ones!";
app.appendChild(shift);

var multi = document.createElement("p");
multi.innerHTML = "Press N to make new text appear.";
app.appendChild(multi);

var text1 = document.createElement("p");
text1.innerHTML = "New text!";

var text2 = document.createElement("p");
text2.innerHTML = "Me too!";

var active = false;
input.bind(" ", function () {
  if (!active) {
    input.bind("r", function () {
      RGB.style = "color:red;";
    });
    input.bind("g", function () {
      RGB.style = "color:green;";
    });
    input.bind("b", function () {
      RGB.style = "color:blue;";
    });

    input.bind("Shift", "R", function () {
      shift.style = "color:red;";
    });

    input.bind("Shift", "G", function () {
      shift.style = "color:green;";
    });

    input.bind("Shift", "B", function () {
      shift.style = "color:blue;";
    });

    input.bind("n", function () {
      app.appendChild(text1);
    });
    input.bind("n", function () {
      app.appendChild(text2);
    });
  } else {
    input.unbind("r");
    input.unbind("g");
    input.unbind("b");

    input.unbind("Shift", "R");
    input.unbind("Shift", "G");
    input.unbind("Shift", "B");

    input.unbind("n");
  }
  active = !active;
});
