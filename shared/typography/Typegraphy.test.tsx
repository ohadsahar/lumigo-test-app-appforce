import { render, screen } from "@testing-library/react";
import AppTitle from "./AppTitle";
import ErrorText from "./ErrorText";
import { typographyErrorMock, typographyAppTitle } from "./TypographyMock";

describe("Checking Typogrpahy components", () => {
  it("Testing Typogrpahy component exists on DOM", () => {
    render(
      <>
        <AppTitle title={typographyAppTitle.title} />
        <ErrorText {...typographyErrorMock} />
      </>
    );
    const appTitleComponent = screen.getByTestId("app-title-box");
    expect(appTitleComponent).toBeInTheDocument();
    const errorTextComponent = screen.getByTestId("error-text-box");
    expect(errorTextComponent).toBeInTheDocument();
    const text = appTitleComponent.textContent;
    expect(text).toEqual(typographyAppTitle.title);
    const error_text = errorTextComponent.textContent;
    expect(error_text).toEqual(typographyErrorMock.text);
  });
});
