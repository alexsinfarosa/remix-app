import { render, screen } from "@testing-library/react";
import DateOfInterest from "./DateOfInterest";

test("renders DateOfInterest component", () => {
  render(<DateOfInterest doi={null} />);
  const dateOfInterest = screen.getByText(/Date of Interest:/i);
  expect(dateOfInterest).toBeInTheDocument();
});

test("selecting a date before 2019-01-01 should return the current date", () => {
  render(<DateOfInterest doi="2018-01-01" />);
  const dateOfInterest = screen.getByTestId("ciccio");
  const currentDate = new Date().toISOString().split("T")[0];
  expect(dateOfInterest.value).toBe(currentDate);
});
