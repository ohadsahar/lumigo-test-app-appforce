import { render, screen } from "@testing-library/react";
import AppTitle from "./AppTitle";
import ErrorText from "./ErrorText";
import { typographyErrorMock, typographyAppTitle } from "./TypographyMock";
import { expect } from "@jest/globals";
describe("Checking Typogrpahy components", () => {
  it("Testing Typogrpahy component exists on DOM", () => {
    render(
      <>
        <AppTitle title={typographyAppTitle.title} />
        <ErrorText {...typographyErrorMock} />
      </>
    );
    const appTitleComponent = screen.getByTestId("app-title-box");
    expect(appTitleComponent).toBeDefined();
    const errorTextComponent = screen.getByTestId("error-text-box");
    expect(errorTextComponent).toBeDefined();
    const text = appTitleComponent.textContent;
    expect(text).toEqual(typographyAppTitle.title);
    const error_text = errorTextComponent.textContent;
    expect(error_text).toEqual(typographyErrorMock.text);
  });
});
