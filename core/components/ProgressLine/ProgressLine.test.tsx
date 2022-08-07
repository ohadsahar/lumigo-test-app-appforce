import { render, screen } from '@testing-library/react';
import AppTestUtil from '../../../AppTestUtil';
import ProgressLine from './ProgressLine';
import { expect } from '@jest/globals';
describe('Checking Layout component', () => {
  it('Testing Layout component exists on DOM', () => {
    render(
      <AppTestUtil>
        <ProgressLine />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId('progress-line-box');
    expect(baseComponent).toBeDefined();
  });
});
