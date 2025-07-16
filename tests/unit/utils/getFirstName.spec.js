import { describe, it, expect } from "vitest";
import getFirstName from "../../../utils/getFirstName";

describe("getFirstName()", () => {
  describe("Valid names", () => {
    it("should return first name from full name", () => {
      expect(getFirstName("Jon Doe")).toBe("Jon");
    });

    it("should return single name when no surname exists", () => {
      expect(getFirstName("Jon")).toBe("Jon");
    });

    it("should handle names with multiple spaces", () => {
      expect(getFirstName("  Jon   Doe  ")).toBe("Jon");
    });

    it("should handle hyphenated names", () => {
      expect(getFirstName("Mary-Jane Watson")).toBe("Mary-Jane");
    });
  });

  describe("Invalid values", () => {
    const ERROR_MESSAGE = "Sem nome";

    it("should return empty string for undefined", () => {
      expect(getFirstName(undefined)).toBe(ERROR_MESSAGE);
    });

    it("should return empty string for null", () => {
      expect(getFirstName(null)).toBe(ERROR_MESSAGE);
    });

    it("should return empty string for numbers", () => {
      expect(getFirstName(1234)).toBe(ERROR_MESSAGE);
    });

    it("should return empty string for empty input", () => {
      expect(getFirstName("")).toBe(ERROR_MESSAGE);
    });

    it("should return empty string for whitespace-only", () => {
      expect(getFirstName("   ")).toBe(ERROR_MESSAGE);
    });

    it("should return empty string for object input", () => {
      expect(getFirstName({ name: "Jon" })).toBe(ERROR_MESSAGE);
    });
  });
});
