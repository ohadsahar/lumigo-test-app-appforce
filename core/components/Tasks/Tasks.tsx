import CompletedTasksList from "@/core/components/CompletedTasksList/CompletedTasksList";
import CreatedTasksList from "@/core/components/CreatedTasksList/CreatedTasksList";
import DoLaterTasksList from "@/core/components/ToDoLaterTasksList/DoLaterTasksList";
import { useTasks } from "./hooks/useTasks";
const Tasks = () => {
  const {
    createdTasks,
    toDoLaterTasks,
    completedTasks,
    taskPendingCount,
    taskCompletedCount,
    handleEdit,
    handleAction,
    doLaterOpen,
    completedOpen,
    setDoLaterOpen,
    setCompletedOpen,
  } = useTasks();
  return (
    <>
      <CreatedTasksList
        tasks={createdTasks}
        handleAction={handleAction}
        handleEdit={handleEdit}
      />
      <DoLaterTasksList
        tasks={toDoLaterTasks}
        doLaterOpen={doLaterOpen}
        taskPendingCount={taskPendingCount}
        handleAction={handleAction}
        handleEdit={handleEdit}
        setDoLaterOpen={setDoLaterOpen}
      />
      <CompletedTasksList
        tasks={completedTasks}
        completedOpen={completedOpen}
        taskCompletedCount={taskCompletedCount}
        setCompletedOpen={setCompletedOpen}
        handleAction={handleAction}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default Tasks;
