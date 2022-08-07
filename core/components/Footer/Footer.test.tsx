import { Strings } from '@/constants/Strings';
import { render, screen } from '@testing-library/react';
import AppTestUtil from '../../../AppTestUtil';
import Footer from './Footer';
import { expect } from '@jest/globals';

describe('Checking Alerts component', () => {
  it('Testing Alerts component exists on DOM', () => {
    render(
      <AppTestUtil>
        <Footer />
      </AppTestUtil>
    );
    const footerTitle = screen.getByRole('app-title-role').innerHTML;
    expect(footerTitle).toBe(Strings.FooterResetProgress);
  });
});
