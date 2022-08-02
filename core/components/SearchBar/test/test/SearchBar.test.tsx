import store from "@/store/store";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchBar from "../../SearchBar";

describe("Checking SearchBar component", () => {
  it("Testing SearchBar component exists on DOM", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const baseComponent = screen.getByTestId("searchbar-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
