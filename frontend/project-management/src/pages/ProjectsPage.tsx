import { useCallback, useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config.json";
import { AddTask } from "../components/forms";
import { ListShow } from "../components/home";
import { Modal, Task } from "../components/UI";
import { useAuth } from "../store/useAuth";
import { project, task } from "../types";

const ProjectsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<project>({
    _id: projectId,
    name: "",
    description: "",
    technologies: [],
    tasks: [],
  });
  const { token, toggleAddTaskHandler, toggleAddTask } = useAuth();

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          jwt: token,
        },
      });
      const data = await res.json();
      const fetchedProject = await data.data;
      setProject(fetchedProject);
    } catch (error) {
      console.log(error);
    }
  }, [projectId, token]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const completedTasks: task[] = project.tasks?.filter((task) => task.isDone) || [];
  const incompleteTasks: task[] = project.tasks?.filter((task) => !task.isDone) || [];

  return (
    <>
      {toggleAddTask && (
        <Modal onClose={toggleAddTaskHandler}>
          <AddTask onClose={toggleAddTaskHandler} project={projectId} refreshProject={fetchProject} />
        </Modal>
      )}

      <div className="w-full rounded border border-gray-300 px-6 py-4 min-h-[450px]">
        <div className="flex justify-between w-full items-center mb-4">
          <div className="font-semibold text-3xl">{project.name}</div>

          <IoChevronBackSharp className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => navigate("/")} />
        </div>

        <ListShow title="تسک ها" toggleModal={toggleAddTaskHandler} btnTitle="اضافه تسک">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              {incompleteTasks.map((task, index) => (
                <Task key={index} task={task} refreshProject={fetchProject} />
              ))}
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-base font-medium mb-4">تسک های انجام شده</h2>
              <div className="w-full flex flex-col gap-2">
                {completedTasks.map((task, index) => (
                  <Task key={index} task={task} refreshProject={fetchProject} />
                ))}
              </div>
            </div>
          </div>
        </ListShow>
      </div>
    </>
  );
};

export default ProjectsPage;
