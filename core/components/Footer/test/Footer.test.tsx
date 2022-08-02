import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Checking Alerts component", () => {
  it("Testing Alerts component exists on DOM", () => {
    render(<Footer></Footer>);
    const baseComponent = screen.getByTestId("footer-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
