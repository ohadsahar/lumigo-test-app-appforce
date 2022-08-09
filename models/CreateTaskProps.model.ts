import { TaskStatusType } from '@/constants/TaskStatus';

export interface CreateTaskProps {
  taskName: string;
  status: TaskStatusType;
}
