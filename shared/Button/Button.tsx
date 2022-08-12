import React from 'react';
import { AppButtonWrapper } from './Styled';

interface AppButtonProps {
  buttonText: string;
  onSubmit: (event: React.SyntheticEvent) => void;
}

const AppButton = ({ buttonText, onSubmit }: AppButtonProps) => {
  return <AppButtonWrapper onClick={onSubmit}>{buttonText}</AppButtonWrapper>;
};

export default AppButton;
