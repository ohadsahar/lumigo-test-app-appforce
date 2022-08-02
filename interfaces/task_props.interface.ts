import { TaskStatusType } from "@/constants/task_status";

export interface TaskProps {
  id: string;
  taskName: string;
  status: TaskStatusType;
}
