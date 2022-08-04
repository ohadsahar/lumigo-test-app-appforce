import { render, screen } from "@testing-library/react";
import AppTestUtil from "../../../AppTestUtil";
import Alerts from "./Alerts";

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
