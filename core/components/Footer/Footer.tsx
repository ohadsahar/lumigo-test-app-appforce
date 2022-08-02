import AppTitle from "@/shared/typography/app_title";
import { resetProgress } from "@/store/actions/tasks.actions";
import React from "react";
import { BottomSection } from "./styled";
import { Strings } from "@/constants/strings";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();

  const handleResetProgress = () => {
    dispatch(resetProgress() as any);
  };
  return (
    <BottomSection onClick={() => handleResetProgress()}>
      <AppTitle
        title={Strings.FooterResetProgress}
        fontWeight={"bold"}
        fontSize={"2vw"}
      />
    </BottomSection>
  );
};

export default Footer;
