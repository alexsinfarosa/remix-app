import { isValidDate, validateEmail } from "./utils";

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail(undefined)).toBe(false);
  expect(validateEmail(null)).toBe(false);
  expect(validateEmail("")).toBe(false);
  expect(validateEmail("not-an-email")).toBe(false);
  expect(validateEmail("n@")).toBe(false);
});

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toBe(true);
});

test("isValidDate returns a string date for strings that are dates", () => {
  expect(isValidDate("2020-01-01T00:00:00.000Z")).toBe(
    "2020-01-01T00:00:00.000Z"
  );
  expect(isValidDate("2020/01/01")).toBe("2020/01/01");
  expect(isValidDate("2020")).toBe("2020");
  expect(isValidDate("2020-01")).toBe("2020-01");
  expect(isValidDate("2020-01-01")).toBe("2020-01-01");
});

test("isValidDate returns null for strings that are not dates", () => {
  expect(isValidDate("")).toBe(null);
  expect(isValidDate("not a date")).toBe(null);
});
