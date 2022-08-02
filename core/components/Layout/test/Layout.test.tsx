import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import HomeScreen from "../layout";

describe("Checking Layout component", () => {
  it("Testing Layout component exists on DOM", () => {
    render(<HomeScreen></HomeScreen>);
    const baseComponent = screen.getByTestId("layout-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
