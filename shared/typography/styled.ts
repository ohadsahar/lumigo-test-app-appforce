import styled from "styled-components";
import { AppTitleProps } from "./app_title";

export const AppTitleWrapper = styled.p<AppTitleProps>`
  font-size: ${(props: AppTitleProps) => props.fontSize};
  color: ${(props: AppTitleProps) => props.color};
  font-weight: ${(props: AppTitleProps) => props.fontWeight};
  cursor: pointer;
  break-word: word-break;
`;

export const ErrorTextWrapper = styled.div`
  display: flex;
  padding-top: 1vw;
  color: red;
  font-weight: 600;
`;
