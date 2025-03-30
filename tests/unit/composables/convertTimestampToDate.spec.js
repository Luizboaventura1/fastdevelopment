import { describe, it, expect } from "vitest";
import convertFirebaseTimestampToDate from "../../../composables/convertTimestampToDate.js";

describe("convertFirebaseTimestampToDate", () => {
  it("should return same Date object when input is Date", () => {
    const now = new Date();
    expect(convertFirebaseTimestampToDate(now)).toBe(now);
  });

  it("should convert Firebase timestamp {seconds, nanoseconds}", () => {
    const firebaseTimestamp = { seconds: 1672531200, nanoseconds: 0 }; // 1 Jan 2023 UTC
    const result = convertFirebaseTimestampToDate(firebaseTimestamp);
    expect(result.toISOString()).toBe("2023-01-01T00:00:00.000Z");
  });

  it("should convert milliseconds timestamp", () => {
    const msTimestamp = 1672531200000; // 1 Jan 2023 UTC
    const result = convertFirebaseTimestampToDate(msTimestamp);
    expect(result.toISOString()).toBe("2023-01-01T00:00:00.000Z");
  });

  it("should convert ISO string", () => {
    const isoString = "2023-01-01T00:00:00.000Z";
    const result = convertFirebaseTimestampToDate(isoString);
    expect(result.toISOString()).toBe(isoString);
  });

  it("should convert object with toDate() method", () => {
    const mockObj = {
      toDate: () => new Date("2023-01-01T00:00:00.000Z")
    };
    const result = convertFirebaseTimestampToDate(mockObj);
    expect(result.toISOString()).toBe("2023-01-01T00:00:00.000Z");
  });

  it("should convert Firebase alt format {_seconds, _nanoseconds}", () => {
    const altFormat = { _seconds: 1672531200, _nanoseconds: 0 };
    const result = convertFirebaseTimestampToDate(altFormat);
    expect(result.toISOString()).toBe("2023-01-01T00:00:00.000Z");
  });

  it("should return null for undefined", () => {
    expect(convertFirebaseTimestampToDate(undefined)).toBeNull();
  });

  it("should return null for null", () => {
    expect(convertFirebaseTimestampToDate(null)).toBeNull();
  });

  it("should return null for invalid string", () => {
    expect(convertFirebaseTimestampToDate("invalid date")).toBeNull();
  });

  it("should return null for empty object", () => {
    expect(convertFirebaseTimestampToDate({})).toBeNull();
  });

  it("should return null for boolean", () => {
    expect(convertFirebaseTimestampToDate(true)).toBeNull();
  });
});