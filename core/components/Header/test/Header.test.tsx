import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Checking Header component", () => {
  it("Testing Header component exists on DOM", () => {
    render(<Header></Header>);
    const baseComponent = screen.getByTestId("header-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
