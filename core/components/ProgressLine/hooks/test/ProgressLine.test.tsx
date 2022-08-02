import store from "@/store/store";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProgressLine from "../../progress-line";

describe("Checking Layout component", () => {
  it("Testing Layout component exists on DOM", () => {
    render(
      <Provider store={store}>
        <ProgressLine></ProgressLine>
      </Provider>
    );
    const baseComponent = screen.getByTestId("progress-line-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
