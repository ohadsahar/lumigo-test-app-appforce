import { render, screen } from "@testing-library/react";
import AppTestUtil from "../../../AppTestUtil";
import HomeScreen from "./layout";

describe("Checking Layout component", () => {
  it("Testing Layout component exists on DOM", () => {
    render(
      <AppTestUtil>
        <HomeScreen />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("layout-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
