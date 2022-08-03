import { render, screen } from "@testing-library/react";
import AppTestUtil from "../app_test.util";
import SearchBar from "../core/components/SearchBar/SearchBar";

describe("Checking SearchBar component", () => {
  it("Testing SearchBar component exists on DOM", () => {
    render(
      <AppTestUtil>
        <SearchBar />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("searchbar-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
