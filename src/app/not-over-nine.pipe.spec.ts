import { NotOverNinePipe } from "./not-over-nine.pipe";

describe("NotOverNinePipe", () => {
  it("create an instance", () => {
    const pipe = new NotOverNinePipe();
    expect(pipe).toBeTruthy();
  });
});
