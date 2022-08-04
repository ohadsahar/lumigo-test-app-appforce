import { AlertProps } from "models/Alert.model";

interface ErrorProps {
  text: string;
}

interface TitleProps {
  title: string;
}

export const typographyErrorMock: ErrorProps = {
  text: "Error should be shown",
};

export const typographyAppTitle: TitleProps = {
  title: "Task app - appsforce",
};
