import { Strings } from "@/constants/strings";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AppTestUtil from "../../../AppTestUtil";
import Footer from "./Footer";

describe("Checking Alerts component", () => {
  it("Testing Alerts component exists on DOM", () => {
    render(
      <AppTestUtil>
        <Footer />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId("footer-box");
    expect(baseComponent).toBeInTheDocument();
    const footerTitle = screen.getByRole("app-title-role").innerHTML;
    expect(footerTitle).toBe(Strings.FooterResetProgress);
  });
});
