import input from "./lib/Input.js";

// This file is a trial run for the full library.
// Feel free to mess around with it to make different stuff happen.

const app = document.getElementById("app");

// populating the div
var space = document.createElement("p");
space.innerHTML = "PRESS SPACE to enable/disable input.";
app.appendChild(space);

var mousemove = document.createElement("p");
mousemove.innerHTML = "Your current mouse position:";
app.appendChild(mousemove);

var click = document.createElement("p");
click.innerHTML = "Clicked @";
app.appendChild(click);

var rightclick = document.createElement("p");
rightclick.innerHTML = "Clicked @";
app.appendChild(rightclick);

var RGB = document.createElement("p");
RGB.innerHTML = "Press RGB to change colors!";
app.appendChild(RGB);

var shift = document.createElement("p");
shift.innerHTML = "Use Shift to control these ones!";
app.appendChild(shift);

var multi = document.createElement("p");
multi.innerHTML = "Press N to make new text appear.";
app.appendChild(multi);

// these ones aren't appended (yet!)
var text1 = document.createElement("p");
text1.innerHTML = "New text!";

var text2 = document.createElement("p");
text2.innerHTML = "Me too!";

// use "active" to keep track of state.
// this way, space can toggle whether it's active.
var active = false;
input.bind(" ", function () {
  if (!active) {
    input.bind("mousemove", function () {
      mousemove.innerHTML = `Your current mouse position: ${input.x}, ${input.y}`;
    });
    input.bind("mouseleft", function () {
      click.innerHTML = `Clicked @ ${input.x}, ${input.y}`;
    });
    input.bind("mouseright", function () {
      rightclick.innerHTML = `Right clicked @ ${input.x}, ${input.y}`;
    });

    input.upbind("r", function () {
      RGB.style = "color:red;";
    });
    input.upbind("g", function () {
      RGB.style = "color:green;";
    });
    input.upbind("b", function () {
      RGB.style = "color:blue;";
    });

    input.upbind("Shift", "R", function () {
      shift.style = "color:red;";
    });

    input.upbind("Shift", "G", function () {
      shift.style = "color:green;";
    });

    input.upbind("Shift", "B", function () {
      shift.style = "color:blue;";
    });

    input.upbind("n", function () {
      app.appendChild(text1);
    });
    input.upbind("n", function () {
      app.appendChild(text2);
    });

    input.contextmenu(false);
  } else {
    input.unbind("mousemove");
    input.unbind("mouseleft");
    input.unbind("mouseright");

    input.unupbind("r");
    input.unupbind("g");
    input.unupbind("b");

    input.unupbind("Shift", "R");
    input.unupbind("Shift", "G");
    input.unupbind("Shift", "B");

    input.unupbind("n");

    input.contextmenu(true);
  }
  active = !active;
});
