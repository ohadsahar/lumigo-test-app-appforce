import Alert from '@/core/components/Alert/Alert';
import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import AppTestUtil from '../../../AppTestUtil';
import { alert } from './AlertMock';

describe('Checking Alert component', () => {
  it('Testing Alert component exists on DOM', () => {
    render(
      <AppTestUtil>
        <Alert {...alert}></Alert>
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId('alert-box');
    const baseComponentStyles = getComputedStyle(baseComponent);
    const text = baseComponent.textContent;
    expect(text).toEqual('This Should Error');
    expect(baseComponentStyles.backgroundColor).toBe('red');
    expect(baseComponentStyles.backgroundColor).not.toBe(
      'background-color: green'
    );
  });
});
