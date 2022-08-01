import { Strings } from "@/constants/strings";
import { AlertProps } from "interfaces/alert.interface";
import { AlertParagraph } from "./styled";

const Alert = (alert: AlertProps) => {
  return (
    <AlertParagraph
      danger={alert.alertType === Strings.Error ? true : false}
      key={alert.id}
    >
      {alert.msg}
    </AlertParagraph>
  );
};

export default Alert;
