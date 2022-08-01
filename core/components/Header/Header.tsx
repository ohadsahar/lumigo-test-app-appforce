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
    <HeaderWrapper>
      <DateWrapper>
        <DayWrapper>
          <AppTitle
            title={convertedDate?.day.toString()}
            fontWeight={"bold"}
            fontSize={"5vw"}
          />
        </DayWrapper>
        <YearAndMonthWrapper>
          <AppTitle
            title={convertedDate?.month}
            fontWeight={"bold"}
            fontSize={"2vw"}
          />
          <AppTitle
            title={convertedDate?.year.toString()}
            fontWeight={"200"}
            fontSize={"2vw"}
          />
        </YearAndMonthWrapper>
      </DateWrapper>
      <AppTitle
        title={convertedDate?.currentDay}
        fontWeight={"100"}
        fontSize={"1.5vw"}
      />
    </HeaderWrapper>
  );
};

export default Header;
