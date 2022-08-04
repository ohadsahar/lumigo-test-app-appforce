import AppTitle from "@/shared/typography/AppTitle";
import { resetProgress } from "@/redux/actions/Tasks";
import React from "react";
import { BottomSection } from "./styled";
import { Strings } from "@/constants/Strings";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();

  const handleResetProgress = () => {
    dispatch(resetProgress() as any);
  };

  return (
    <BottomSection data-testid="footer-box" onClick={handleResetProgress}>
      <AppTitle
        title={Strings.FooterResetProgress}
        fontWeight={"bold"}
        fontSize={"2vw"}
      />
    </BottomSection>
  );
};

export default Footer;
