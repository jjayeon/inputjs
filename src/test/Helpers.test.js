// A big old file for testing Helpers.js with unit tests.
// The integration test is all of index.js.
// uses mocha.js.

/* eslint-disable no-undef */
const assert = require("assert").strict;
const helper = require("../lib/Helpers.js");

describe("testing helper.initBinds()", function () {
  it("should always generate a specific object.", function () {
    const expected = { None: {}, Alt: {}, Control: {}, Meta: {}, Shift: {} };
    assert.deepStrictEqual(helper.initBinds(), expected);
    assert.deepStrictEqual(helper.initBinds(true), expected);
    assert.deepStrictEqual(helper.initBinds("no stoP", "PLEASE"), expected);
  });
});

describe("testing helper.extract(args)", function () {
  // helper.extract should intelligently return values
  // depending on the arguments with which it's called.
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

describe("testing bind and unbind", function () {
  var data, empty, tests;
  before(function () {
    // "data" replicates a portion of the "data" variable in src/lib/Input.js.
    data = { binds: helper.initBinds(), upbinds: helper.initBinds() };
    // an empty function.
    empty = () => {};
    tests = [
      { mod: "None", key: "a", callback: empty },
      { mod: "None", key: "b", callback: empty },
      { mod: "None", key: "c", callback: empty },
      { mod: "None", key: "mouseleft", callback: empty },
      { mod: "None", key: "mousemove", callback: empty },
      { mod: "Shift", key: "a", callback: empty },
      { mod: "Shift", key: "a", callback: empty },
    ];
  });

  describe("testing helper.bindHelper()", function () {
    before(function () {
      for (const test of tests) {
        helper.bindHelper(data, test, "down", true);
      }
    });
    it('are the keys of data.bind["None"] correct?', function () {
      assert.deepStrictEqual(Object.keys(data.binds["None"]), [
        "a",
        "b",
        "c",
        "mouseleft",
        "mousemove",
      ]);
    });
    it('are the keys of data.bind["Shift"] correct?', function () {
      assert.deepStrictEqual(Object.keys(data.binds["Shift"]), ["a"]);
    });
    it('does data.bind["Shift"] have the right number of binds?', function () {
      assert.strictEqual(data.binds["Shift"]["a"].length, 2);
    });
  });

  describe("testing helper.unbindHelper()", function () {
    before(function () {
      for (const test of tests) {
        helper.unbindHelper(data, test, "down", true);
      }
    });
    it('is data.binds["None"] empty?', function () {
      assert.deepStrictEqual(data.binds["None"], {
        a: [],
        b: [],
        c: [],
        mouseleft: [],
        mousemove: [],
      });
    });
    it('is data.binds["Shift"] empty?', function () {
      assert.deepStrictEqual(data.binds["Shift"], { a: [] });
    });
  });
});
