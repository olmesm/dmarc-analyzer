import { describe, expect, it } from "vitest";
import { createMatrixFromCollection } from ".";

const input = [
  { id: 1, name: "jo" },
  { id: 2, name: "zed", age: 26 },
  { id: 3, name: "lee", location: "uk" },
];

const output = [
  ["id", "name", "age", "location"],
  [1, "jo", undefined, undefined],
  [2, "zed", 26, undefined],
  [3, "lee", undefined, "uk"],
];

describe("table convert", () => {
  it("converts a collection", () => {
    expect(createMatrixFromCollection(input)).toStrictEqual(output);
  });

  it("converts a collection sorting by known headers", () => {
    const headers1 = ["name"];
    expect(createMatrixFromCollection(input, headers1)).toStrictEqual([
      ["name", "id", "age", "location"],
      ["jo", 1, undefined, undefined],
      ["zed", 2, 26, undefined],
      ["lee", 3, undefined, "uk"],
    ]);

    const headers2 = ["age", "name"];
    expect(createMatrixFromCollection(input, headers2)).toStrictEqual([
      ["age", "name", "id", "location"],
      [undefined, "jo", 1, undefined],
      [26, "zed", 2, undefined],
      [undefined, "lee", 3, "uk"],
    ]);
  });

  it("converts a collection with only required headers as input", () => {
    const headers1 = ["id"];
    expect(createMatrixFromCollection(input, headers1, true)).toStrictEqual([
      headers1,
      [1],
      [2],
      [3],
    ]);

    const headers2 = ["id", "age"];
    expect(createMatrixFromCollection(input, headers2, true)).toStrictEqual([
      headers2,
      [1, undefined],
      [2, 26],
      [3, undefined],
    ]);
  });
});
