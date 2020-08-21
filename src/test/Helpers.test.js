/* eslint-disable no-undef */
const assert = require("assert").strict;
const helper = require("../lib/Helpers.js");

describe("testing the test", () => {
  it("should just pass.", () => {
    assert.ok(true);
  });
});

describe("testing helper.initBinds()", () => {
  it("should always generate a specific object.", () => {
    const expected = { None: {}, Alt: {}, Control: {}, Meta: {}, Shift: {} };
    assert.deepStrictEqual(helper.initBinds(), expected);
    assert.deepStrictEqual(helper.initBinds(true), expected);
    assert.deepStrictEqual(helper.initBinds("no stoP", "please"), expected);
  });
});

describe("testing helper.extract(args)", () => {
  it('args: [str] => { mod: "None", key: str, callback: undefined }', () => {
    var expected = { mod: "None", callback: undefined };
    const tests = ["a", "b", "Tab", "Escape", "F1"];

    for (const test of tests) {
      expected.key = test;
      assert.deepStrictEqual(helper.extract([test]), expected);
    }
  });
  it("args: [str1, str2] => { mod: str1, key: str2, callback: undefined }", () => {
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
  it('args: [str, func] => { mod: "None", key: str, callback: func', () => {
    var expected = { mod: "None" };
    const tests = [
      ["a", () => {}],
      [
        "b",
        () => {
          console.log("hi");
        },
      ],
      [
        "Escape",
        () => {
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
  it("args: [str1, str2, func] => { mod: str1, key: str2, callback: func}", () => {
    var expected = {};
    const tests = [
      ["Shift", "A", () => {}],
      [
        "Control",
        "b",
        () => {
          console.log("ctrl b");
        },
      ],
      [
        "Meta",
        "Tab",
        () => {
          throw new Error("agh what");
        },
      ],
      [
        "Alt",
        "Escape",
        () => {
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
