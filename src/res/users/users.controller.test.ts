import { sum } from "./users.controller";

describe("Users controller", () => {
  it("should returns the sum of the arguments", () => {
    expect(sum(5, 9)).toEqual(14);
  });
});
