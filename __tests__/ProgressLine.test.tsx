import ProgressLine from "@/core/components/ProgressLine/progress-line";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AppTestUtil from "../app_test.util";

describe("Checking Layout component", () => {
  it("Testing Layout component exists on DOM", () => {
    render(
      <AppTestUtil>
        <ProgressLine></ProgressLine>
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("progress-line-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
