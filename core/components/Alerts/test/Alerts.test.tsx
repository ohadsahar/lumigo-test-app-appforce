import store from "@/store/store";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Alerts from "../Alerts";

describe("Checking Alerts component", () => {
  it("Testing Alerts component exists on DOM", () => {
    render(
      <Provider store={store}>
        <Alerts></Alerts>
      </Provider>
    );
    const baseComponent = screen.getByTestId("alerts-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
