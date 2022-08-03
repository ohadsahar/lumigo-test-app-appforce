import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AppTestUtil from "../app_test.util";
import Alerts from "../core/components/Alerts/Alerts";

describe("Checking Alerts component", () => {
  it("Testing Alerts component exists on DOM", () => {
    render(
      <AppTestUtil>
        <Alerts />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("alerts-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
