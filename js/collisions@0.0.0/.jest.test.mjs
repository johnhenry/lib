import collideiterators from "./collideiterators.mjs";

describe("Collide iterators", () => {
  const cases = [
    { name: "john", x: 1, y: 2 },
    { name: "jim", x: 1, y: 2 },
    { name: "james", x: 2, y: 2 },
  ];
  test("should pair colliding items", () => {
    expect([...collideiterators(cases, cases)]).toStrictEqual([
      [
        { name: "john", x: 1, y: 2 },
        { name: "jim", x: 1, y: 2 },
      ],
      [
        { name: "jim", x: 1, y: 2 },
        { name: "john", x: 1, y: 2 },
      ],
    ]);
  });
});
