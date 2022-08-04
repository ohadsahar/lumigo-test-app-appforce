import React from "react";
import { AppTitleWrapper } from "./styled";

export interface AppTitleProps {
  title?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  role?: string;
  dataCy?: string;
}
const AppTitle = ({
  title,
  fontWeight = "100",
  color = "white",
  fontSize = "3vw",
  role = "app-title-role",
  dataCy,
}: AppTitleProps) => {
  return (
    <AppTitleWrapper
      data-cy={dataCy}
      role={role}
      data-testid="app-title-box"
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {title}
    </AppTitleWrapper>
  );
};

export default AppTitle;
