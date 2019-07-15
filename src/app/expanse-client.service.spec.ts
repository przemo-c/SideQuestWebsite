import { TestBed } from "@angular/core/testing";

import { ExpanseClientService } from "./expanse-client.service";

describe("ExpanseClientService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ExpanseClientService = TestBed.get(ExpanseClientService);
    expect(service).toBeTruthy();
  });
});
