import { Strings } from "@/constants/strings";
import { AlertProps } from "interfaces/alert.interface";
import { AlertParagraph } from "./styled";

const Alert = ({ id, msg, alertType }: AlertProps) => {
  return (
    <AlertParagraph
      danger={alertType === Strings.Error ? true : false}
      key={id}
    >
      {msg}
    </AlertParagraph>
  );
};

export default Alert;
