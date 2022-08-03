import HomeScreen from "@/core/components/Layout/layout";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AppTestUtil from "../app_test.util";

describe("Checking Layout component", () => {
  it("Testing Layout component exists on DOM", () => {
    render(
      <AppTestUtil>
        <HomeScreen></HomeScreen>
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("layout-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
