import { TaskStatusType } from "@/constants/task_status";
import Task from "@/core/components/Task/Task";
import { useTasks } from "@/core/components/Tasks/hooks/useTasks";
import store from "@/store/store";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AppTestUtil from "../app_test.util";
import { TaskProps } from "interfaces/task_props.interface";
import { Provider } from "react-redux";
import { createTask } from "@/store/actions/tasks.actions";

describe("Testing task component", () => {
  it("Testing task component showing on screen", () => {
    const task: TaskProps = {
      id: "1",
      taskName: "Clean",
      status: TaskStatusType.CREATED,
    };
    const listName = TaskStatusType.CREATED;

    render(
      <AppTestUtil>
        <Task
          task={task}
          setCurrentEdit={() => {}}
          showCheck
          showPause
          handleAction={(data: string) => {}}
          handleEdit={() => {}}
        />
      </AppTestUtil>
    );

    const baseComponent = screen.getByTestId("task-box");
    expect(baseComponent).toBeInTheDocument();
  });
});
