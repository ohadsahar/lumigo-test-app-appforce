import AppTitle from "@/shared/typography/app_title";
import { DateProps } from "interfaces/date_props.interface";
import React, { useEffect, useState } from "react";
import {
  DateWrapper,
  DayWrapper,
  HeaderWrapper,
  YearAndMonthWrapper,
} from "./styled";

const Header = () => {
  const [currentDate, setCurrentDate] = useState<DateProps>();

  useEffect(() => {
    const today = new Date(Date.now());
    const convertedDate: DateProps = {
      day: today.getDate(),
      month: today.toLocaleString("default", { month: "long" }),
      year: today.getFullYear(),
      currentDay: today.toLocaleString("default", { weekday: "long" }),
    };
    setCurrentDate(convertedDate);
  }, []);

  return (
    <HeaderWrapper>
      <DateWrapper>
        <DayWrapper>
          <AppTitle
            title={currentDate?.day}
            fontWeight={"bold"}
            fontSize={"5vw"}
          />
        </DayWrapper>
        <YearAndMonthWrapper>
          <AppTitle
            title={currentDate?.month}
            fontWeight={"bold"}
            fontSize={"2vw"}
          />
          <AppTitle
            title={currentDate?.year}
            fontWeight={"200"}
            fontSize={"2vw"}
          />
        </YearAndMonthWrapper>
      </DateWrapper>
      <AppTitle
        title={currentDate?.currentDay}
        fontWeight={"100"}
        fontSize={"1.5vw"}
      />
    </HeaderWrapper>
  );
};

export default Header;
