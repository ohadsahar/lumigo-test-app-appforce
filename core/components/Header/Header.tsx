import AppTitle from "@/shared/typography/app_title";
import { useDate } from "./hooks/useData";
import {
  DateWrapper,
  DayWrapper,
  HeaderWrapper,
  YearAndMonthWrapper,
} from "./styled";

const Header = () => {
  const { convertedDate } = useDate();

  return (
    <HeaderWrapper data-testid="header-box" data-cy="cy-header">
      <DateWrapper data-cy="cy-header-date-wrapper">
        <DayWrapper data-cy="cy-header-day-wrapper">
          <AppTitle
            dataCy="cy-header-day"
            role="header-day-role"
            title={convertedDate?.day.toString()}
            fontWeight="bold"
            fontSize="5vw"
          />
        </DayWrapper>
        <YearAndMonthWrapper data-cy="cy-header-month-year-wrapper">
          <AppTitle
            dataCy="cy-header-month"
            role="header-month-role"
            title={convertedDate?.month}
            fontWeight="bold"
            fontSize="2vw"
          />
          <AppTitle
            dataCy="cy-header-year"
            role="header-year-role"
            title={convertedDate?.year.toString()}
            fontWeight="200"
            fontSize="2vw"
          />
        </YearAndMonthWrapper>
      </DateWrapper>
      <AppTitle
        dataCy="cy-header-day-name"
        role="header-day-name-role"
        title={convertedDate?.currentDay}
        fontWeight="100"
        fontSize="1.5vw"
      />
    </HeaderWrapper>
  );
};

export default Header;
