import React from "react";
import { ErrorTextWrapper } from "./styled";

const ErrorText = (text: string) => {
  return <ErrorTextWrapper>{text}</ErrorTextWrapper>;
};

export default ErrorText;
