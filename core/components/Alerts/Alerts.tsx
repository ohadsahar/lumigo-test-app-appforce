import Alert from "../Alert/Alert";
import { AlertsWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Alerts = () => {
  const alerts = useSelector((state: RootState) => state.alertState);

  return (
    <AlertsWrapper>
      {alerts?.map((alert: any) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </AlertsWrapper>
  );
};

export default Alerts;
