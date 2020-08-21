import input from "./lib/Input.js"; // eslint-disable-line no-unused-vars
import tests from "./lib/Tests.js"; // eslint-disable-line no-unused-vars
import helper from "./lib/Helpers.js"; // eslint-disable-line no-unused-vars

tests.test_bind(input);
input.bind("Space", () => {
  console.log("space pressed");
  tests.test_unbind(input);
});
