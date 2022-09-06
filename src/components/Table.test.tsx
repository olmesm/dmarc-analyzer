import { describe, expect, it } from "vitest";
import { createMatrixFromCollection } from "./Table";

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

  it("converts a collection with required headers as input", () => {
    const headers1 = ["id"];
    expect(createMatrixFromCollection(input, headers1)).toStrictEqual([
      headers1,
      [1],
      [2],
      [3],
    ]);

    const headers2 = ["id", "age"];
    expect(createMatrixFromCollection(input, headers2)).toStrictEqual([
      headers2,
      [1, undefined],
      [2, 26],
      [3, undefined],
    ]);
  });
});
