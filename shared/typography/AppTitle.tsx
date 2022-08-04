import React from "react";
import { AppTitleWrapper } from "./styled";

export interface AppTitleProps {
  title?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  role?: string;
  testId?: string;
}
const AppTitle = ({
  title,
  fontWeight = "100",
  color = "white",
  fontSize = "3vw",
  role = "app-title-role",
  testId = "app-title-box",
}: AppTitleProps) => {
  return (
    <AppTitleWrapper
      role={role}
      data-testid={testId}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {title}
    </AppTitleWrapper>
  );
};

export default AppTitle;
