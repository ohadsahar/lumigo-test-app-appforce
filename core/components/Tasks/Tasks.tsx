import { TaskStatusType } from "@/constants/task_status";
import TasksList from "@/core/components/TasksList/TasksList";
import { useTasks } from "./hooks/useTasks";
const Tasks = () => {
  const {
    createdTasks,
    toDoLaterTasks,
    completedTasks,
    taskPendingCount,
    taskCompletedCount,
    doLaterOpen,
    completedOpen,
    handleEdit,
    handleAction,
    setDoLaterOpen,
    setCompletedOpen,
    editTaskId,
    setEditTaskId,
  } = useTasks();
  return (
    <>
      <div data-cy="created-tasks-list">
        <TasksList
          tasks={createdTasks}
          doLaterOpen={doLaterOpen}
          taskPendingCount={taskPendingCount}
          handleAction={handleAction}
          handleEdit={handleEdit}
          setDoLaterOpen={setDoLaterOpen}
          listName={TaskStatusType.CREATED}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      </div>
      <div data-cy="do-later-tasks-list">
        <TasksList
          tasks={toDoLaterTasks}
          doLaterOpen={doLaterOpen}
          taskPendingCount={taskPendingCount}
          handleAction={handleAction}
          handleEdit={handleEdit}
          setDoLaterOpen={setDoLaterOpen}
          listName={TaskStatusType.PENDING}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      </div>
      <div data-cy="finished-tasks-list">
        <TasksList
          tasks={completedTasks}
          completedOpen={completedOpen}
          taskCompletedCount={taskCompletedCount}
          setCompletedOpen={setCompletedOpen}
          handleAction={handleAction}
          handleEdit={handleEdit}
          listName={TaskStatusType.COMPLETED}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      </div>
    </>
  );
};

export default Tasks;
