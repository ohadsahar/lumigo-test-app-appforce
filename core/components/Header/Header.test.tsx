import { useDate } from "@/core/components/Header/hooks/useData";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Checking Header component", () => {
  it("Testing Header component exists on DOM", () => {
    const { convertedDate } = useDate();
    render(<Header />);
    const baseComponent = screen.getByTestId("header-box");
    const headerDayRole = screen.getByRole("header-day-role");
    const headerMonthRole = screen.getByRole("header-month-role");
    const headerYearRole = screen.getByRole("header-year-role");
    const headerDayNameRole = screen.getByRole("header-day-name-role");
    expect(baseComponent).toBeInTheDocument();
    expect(headerDayRole.innerHTML).toEqual(convertedDate.day.toString());
    expect(headerMonthRole.innerHTML).toEqual(convertedDate.month);
    expect(headerYearRole.innerHTML).toEqual(convertedDate.year.toString());
    expect(headerDayNameRole.innerHTML).toEqual(convertedDate.currentDay);
  });
});
