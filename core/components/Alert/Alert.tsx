import { Strings } from "@/constants/Strings";
import { AlertProps } from "models/alert.interface";
import { AlertParagraph } from "./styled";

const Alert = ({ id, msg, alertType }: AlertProps) => {
  return (
    <AlertParagraph
      data-testid="alert-box"
      danger={alertType === Strings.Error ? true : false}
      key={id}
    >
      {msg}
    </AlertParagraph>
  );
};

export default Alert;
