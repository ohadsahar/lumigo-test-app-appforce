import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";
import { alert } from "./AlertMock";

describe("Checking Alert component", () => {
  it("Testing Alert component exists on DOM", () => {
    render(<Alert {...alert}></Alert>);
    const baseComponent = screen.getByTestId("alert-box");
    expect(baseComponent).toBeInTheDocument();
    const text = baseComponent.textContent;
    expect(text).toEqual("This Should Error");
  });
});
