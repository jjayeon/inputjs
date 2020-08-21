import input from "./lib/Input.js"; // eslint-disable-line no-unused-vars
import tests from "./lib/Tests.js"; // eslint-disable-line no-unused-vars

input.bind("a", () => {
  console.log("this shouldn't fire");
});
input.unbind("a");
// input.bind(" ", () => {
//   console.log("space pressed");
//   tests.test_unbind(input);
// });
