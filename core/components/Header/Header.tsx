import AppTitle from '@/shared/typography/AppTitle';
import { useDate } from './hooks/useData';
import {
  DateWrapper,
  DayWrapper,
  HeaderWrapper,
  YearAndMonthWrapper,
} from './styled';

const Header = () => {
  const { convertedDate } = useDate();

  return (
    <HeaderWrapper data-testid="header-box">
      <DateWrapper>
        <DayWrapper>
          <AppTitle
            role="header-day-role"
            title={convertedDate?.day.toString()}
            fontWeight="bold"
            fontSize="5vw"
          />
        </DayWrapper>
        <YearAndMonthWrapper>
          <AppTitle
            role="header-month-role"
            title={convertedDate?.month}
            fontWeight="bold"
            fontSize="2vw"
          />
          <AppTitle
            role="header-year-role"
            title={convertedDate?.year.toString()}
            fontWeight="200"
            fontSize="2vw"
          />
        </YearAndMonthWrapper>
      </DateWrapper>
      <AppTitle
        role="header-day-name-role"
        title={convertedDate?.currentDay}
        fontWeight="100"
        fontSize="1.5vw"
      />
    </HeaderWrapper>
  );
};

export default Header;
