import { Strings } from '@/constants/Strings';
import { TaskStatusType } from '@/constants/TaskStatus';
import AppTitle from '@/shared/typography/AppTitle';
import { TaskProps } from 'models/TaskProps.model';
import { Dispatch, SetStateAction } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import {
  DownArrowWrapper,
  TasksLayout,
  TasksWrapper,
  TaskTitleWrapper,
} from '../Tasks/styled';

interface TaskListProps {
  tasks: TaskProps[];
  completedOpen?: boolean;
  doLaterOpen?: boolean;
  taskCompletedCount?: number;
  taskPendingCount?: number;
  editTaskId: string;
  listName: TaskStatusType;
  'data-testid'?: string;
  handleAction: (action: string, task: TaskProps) => void;
  handleEdit: (task: TaskProps) => void;
  setDoLaterOpen?: Dispatch<SetStateAction<boolean>>;
  setCompletedOpen?: Dispatch<SetStateAction<boolean>>;
  setEditTaskId: Dispatch<SetStateAction<string>>;
}
const TasksList = ({
  tasks,
  handleAction,
  handleEdit,
  completedOpen,
  taskCompletedCount,
  doLaterOpen,
  taskPendingCount,
  setDoLaterOpen,
  setCompletedOpen,
  listName,
  editTaskId,
  setEditTaskId,
  'data-testid': dataTestId = 'task-list-box',
}: TaskListProps) => {
  return (
    <TasksWrapper data-testid="task-list-box">
      {listName === TaskStatusType.PENDING && setDoLaterOpen && (
        <TaskTitleWrapper onClick={() => setDoLaterOpen(!doLaterOpen)}>
          <DownArrowWrapper>
            {doLaterOpen ? <FaAngleDown /> : <FaAngleRight />}
          </DownArrowWrapper>
          <AppTitle
            title={`${Strings.DoLaterListName} (${taskPendingCount})`}
            fontWeight="bold"
            fontSize="2vw"
          />
        </TaskTitleWrapper>
      )}
      {listName === TaskStatusType.COMPLETED && setCompletedOpen && (
        <TaskTitleWrapper onClick={() => setCompletedOpen(!completedOpen)}>
          <DownArrowWrapper>
            {completedOpen ? <FaAngleDown /> : <FaAngleRight />}
          </DownArrowWrapper>
          <AppTitle
            title={`${Strings.CompletedListName} (${taskCompletedCount})`}
            fontWeight="bold"
            fontSize="2vw"
          />
        </TaskTitleWrapper>
      )}

      <TasksLayout data-testid={dataTestId}>
        {tasks?.map((task: TaskProps, index: number) => (
          <div key={index}>
            {task.id !== editTaskId ? (
              <div data-testid="task-item">
                <Task
                  setCurrentEdit={() => setEditTaskId(task.id)}
                  showCheck={listName !== TaskStatusType.COMPLETED}
                  showPause={[
                    TaskStatusType.COMPLETED,
                    TaskStatusType.CREATED,
                  ].includes(listName)}
                  task={task}
                  handleAction={(data: string) => handleAction(data, task)}
                  handleEdit={() => handleEdit(task)}
                />
              </div>
            ) : (
              <TaskForm
                key={task.id}
                handleEditClick={() => setEditTaskId('')}
                {...task}
              />
            )}
          </div>
        ))}
      </TasksLayout>
    </TasksWrapper>
  );
};
export default TasksList;
