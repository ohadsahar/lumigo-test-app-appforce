import { render, screen } from '@testing-library/react';
import AppTestUtil from '../../../AppTestUtil';
import Alerts from './Alerts';
import { expect } from '@jest/globals';

describe('Checking Alerts component', () => {
  it('Testing Alerts component exists on DOM', () => {
    render(
      <AppTestUtil>
        <Alerts />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId('alerts-box');
    const baseComponentStyles = getComputedStyle(baseComponent);
    expect(baseComponent).toBeDefined();
    expect(baseComponentStyles.position).toBe('absolute');
  });
});
