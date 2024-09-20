import { task } from "../../types";

interface TaskProps {
  task: task;
}

const Task = ({ task }: TaskProps) => {
  console.log(task);
  return <div>Task</div>;
};

export default Task;
