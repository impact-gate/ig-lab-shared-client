import { describe, it, expect } from "vitest";
import { SharedApiClient } from "../src/index.js";

describe("SharedApiClient Baseline", () => {
  it("constructs with baseUrl and callerService", () => {
    const client = new SharedApiClient("http://localhost:8080", "test-caller");
    expect(client).toBeDefined();
  });
});
