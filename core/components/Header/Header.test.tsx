import { useDate } from '@/core/components/Header/hooks/useData';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { expect } from '@jest/globals';

describe('Checking Header component', () => {
  it('Testing Header component exists on DOM', () => {
    const { convertedDate } = useDate();
    render(<Header />);
    const headerDayRole = screen.getByRole('header-day-role');
    const headerMonthRole = screen.getByRole('header-month-role');
    const headerYearRole = screen.getByRole('header-year-role');
    const headerDayNameRole = screen.getByRole('header-day-name-role');

    expect(headerDayRole.innerHTML).toEqual(convertedDate.day.toString());
    expect(headerMonthRole.innerHTML).toEqual(convertedDate.month);
    expect(headerYearRole.innerHTML).toEqual(convertedDate.year.toString());
    expect(headerDayNameRole.innerHTML).toEqual(convertedDate.currentDay);
  });
});
