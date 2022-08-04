import { render, screen } from "@testing-library/react";
import AppTestUtil from "../../../AppTestUtil";
import ProgressLine from "./ProgressLine";

describe("Checking Layout component", () => {
  it("Testing Layout component exists on DOM", () => {
    render(
      <AppTestUtil>
        <ProgressLine />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("progress-line-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
