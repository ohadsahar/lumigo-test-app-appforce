import { TaskStatusType } from "@/constants/TaskStatus";

export interface TaskFormProps {
  id?: string;
  taskName: string;
  status: TaskStatusType;
  handleEditClick: () => void;
}
