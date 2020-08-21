/* eslint-disable no-undef */
const assert = require("assert").strict;
const helper = require("../lib/Helpers.js");

describe("testing the test", function () {
  it("should just pass.", function () {
    assert.ok(true);
  });
});

describe("testing helper.initBinds()", function () {
  it("should always generate a specific object.", function () {
    const expected = { None: {}, Alt: {}, Control: {}, Meta: {}, Shift: {} };
    assert.deepStrictEqual(helper.initBinds(), expected);
    assert.deepStrictEqual(helper.initBinds(true), expected);
    assert.deepStrictEqual(helper.initBinds("no stoP", "PLEASE"), expected);
  });
});

describe("testing helper.extract(args)", function () {
  it('args: [str] => { mod: "None", key: str, callback: undefined }', function () {
    var expected = { mod: "None", callback: undefined };
    const tests = ["a", "b", "Tab", "Escape", "F1"];

    for (const test of tests) {
      expected.key = test;
      assert.deepStrictEqual(helper.extract([test]), expected);
    }
  });
  it("args: [str1, str2] => { mod: str1, key: str2, callback: undefined }", function () {
    var expected = { callback: undefined };
    const tests = [
      ["Shift", "A"],
      ["Control", "B"],
      ["Meta", "Escape"],
      ["Alt", "Tab"],
    ];

    for (const test of tests) {
      expected.mod = test[0];
      expected.key = test[1];
      assert.deepStrictEqual(helper.extract(test), expected);
    }
  });
  it('args: [str, func] => { mod: "None", key: str, callback: func', function () {
    var expected = { mod: "None" };
    const tests = [
      ["a", function () {}],
      [
        "b",
        function () {
          console.log("hi");
        },
      ],
      [
        "Escape",
        function () {
          throw new Error("agh what");
        },
      ],
      [
        "Spacebar",
        (a, b) => {
          return a + b;
        },
      ],
    ];

    for (const test of tests) {
      expected.key = test[0];
      expected.callback = test[1];
      assert.deepStrictEqual(helper.extract(test), expected);
    }
  });
  it("args: [str1, str2, func] => { mod: str1, key: str2, callback: func}", function () {
    var expected = {};
    const tests = [
      ["Shift", "A", function () {}],
      [
        "Control",
        "b",
        function () {
          console.log("ctrl b");
        },
      ],
      [
        "Meta",
        "Tab",
        function () {
          throw new Error("agh what");
        },
      ],
      [
        "Alt",
        "Escape",
        function () {
          return 0;
        },
      ],
    ];

    for (const test of tests) {
      expected.mod = test[0];
      expected.key = test[1];
      expected.callback = test[2];
      assert.deepStrictEqual(helper.extract(test), expected);
    }
  });
});

describe("testing helper.bindHelper(data, vals, event) and helper.unbindHelper(data, vals, event)", function () {
  var data;
  before(function () {
    data = helper.initBind(); // eslint-disable-line
  });
});
