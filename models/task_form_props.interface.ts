import { TaskStatusType } from "@/constants/task_status";

export interface TaskFormProps {
  id?: string;
  taskName: string;
  status: TaskStatusType;
  handleEditClick: () => void;
}
