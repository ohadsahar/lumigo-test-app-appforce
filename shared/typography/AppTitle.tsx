import React from "react";
import { AppTitleWrapper } from "./styled";

export interface AppTitleProps {
  title?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  role?: string;
  "data-testid"?: string;
}
const AppTitle = ({
  title,
  fontWeight = "100",
  color = "white",
  fontSize = "3vw",
  role = "app-title-role",
  "data-testid": dataTestid = "app-title-box",
}: AppTitleProps) => {
  return (
    <AppTitleWrapper
      role={role}
      data-testid={dataTestid}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {title}
    </AppTitleWrapper>
  );
};

export default AppTitle;
