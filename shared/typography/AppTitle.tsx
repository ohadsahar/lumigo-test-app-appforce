import React from 'react';
import { AppTitleWrapper } from './styled';

export interface AppTitleProps {
  title?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  role?: string;
}
const AppTitle = ({
  title,
  fontWeight = '100',
  color = 'white',
  fontSize = '3vw',
  role = 'app-title-role',
}: AppTitleProps) => {
  return (
    <AppTitleWrapper
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
