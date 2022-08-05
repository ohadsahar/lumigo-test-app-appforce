import Alert from '@/core/components/Alert/Alert';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { alert } from './AlertMock';
import React from 'react';
import AppTestUtil from '../../../AppTestUtil';

describe('Checking Alert component', () => {
  it('Testing Alert component exists on DOM', () => {
    render(
      <AppTestUtil>
        <Alert {...alert}></Alert>
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId('alert-box');
    expect(baseComponent).toBeInTheDocument();
    const text = baseComponent.textContent;
    expect(text).toEqual('This Should Error');
    expect(baseComponent).toHaveStyle('background-color: red');
    expect(baseComponent).not.toHaveStyle('background-color: green');
  });
});
