import React from 'react';
import { ErrorTextWrapper } from './styled';

interface ErrorProps {
  text: string;
}
const ErrorText = (errorProps: ErrorProps) => {
  return (
    <ErrorTextWrapper data-testid="error-text-box">
      {errorProps?.text}
    </ErrorTextWrapper>
  );
};

export default ErrorText;
