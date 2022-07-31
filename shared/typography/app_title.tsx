import React from 'react';
import { AppTitleWrapper } from './styled';

const AppTitle = ({ title, fontWeight = 100, color = 'white', fontSize = '3vw' }: any) => {

  return <AppTitleWrapper fontSize={fontSize} fontWeight={fontWeight} color={color}>{title} </AppTitleWrapper>;
};

export default AppTitle;
