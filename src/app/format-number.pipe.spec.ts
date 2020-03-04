import { async } from "@angular/core/testing";
import { FormatNumberPipe } from "./format-number.pipe";

describe("FormatNumberPipe", () => {
  let pipe: FormatNumberPipe;

  beforeEach(async(() => {
    pipe = new FormatNumberPipe();
  }));

  it("returns a fallback when providing no value", () => {
    expect(pipe.transform(undefined)).toEqual("N/A");
  });

  it("returns the exact number when under 1000", () => {
    expect(pipe.transform(123)).toEqual("123");
  });

  it("places a comma appropriately when === 1000", () => {
    expect(pipe.transform(1000)).toEqual("1,000");
  });

  it("places a comma appropriately when > 1000", () => {
    expect(pipe.transform(1523)).toEqual("1,523");
  });

  it("places commas appropriately when > 1000000", () => {
    expect(pipe.transform(1234567)).toEqual("1,234,567");
  });
});
