import { render, screen } from '@testing-library/react';
import AppTestUtil from '../../../AppTestUtil';
import SearchBar from './SearchBar';

describe('Checking SearchBar component', () => {
  it('Testing SearchBar component exists on DOM', () => {
    render(
      <AppTestUtil>
        <SearchBar />
      </AppTestUtil>
    );
    const baseComponent = screen.getByTestId('searchbar-box');
    expect(baseComponent).toBeInTheDocument();
  });
});
