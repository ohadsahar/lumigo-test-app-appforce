import Alert from "../Alert/Alert";
import { AlertsWrapper } from "./styled";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alerts = useSelector((state: any) => state.alertState);

  return (
    <AlertsWrapper>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts?.map((alert: any) => <Alert key={alert.id} alert={alert} />)}
    </AlertsWrapper>
  );
};

export default Alerts;
