import { TaskStatusType } from "@/constants/TaskStatus";
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
      <TasksList
        data-testid="created-tasks-list"
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

      <TasksList
        data-testid="do-later-tasks-list"
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

      <TasksList
        data-testid="finished-tasks-list"
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
    </>
  );
};

export default Tasks;
