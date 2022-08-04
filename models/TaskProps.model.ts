import { TaskStatusType } from "@/constants/TaskStatus";

export interface TaskProps {
  id: string;
  taskName: string;
  status: TaskStatusType;
}
