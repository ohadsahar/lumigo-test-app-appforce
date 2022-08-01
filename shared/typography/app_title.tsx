import React from "react";
import { AppTitleWrapper } from "./styled";

export interface AppTitleProps {
  title?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
}
const AppTitle = ({
  title,
  fontWeight = "100",
  color = "white",
  fontSize = "3vw",
}: AppTitleProps) => {
  return (
    <AppTitleWrapper fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {title}{" "}
    </AppTitleWrapper>
  );
};

export default AppTitle;
