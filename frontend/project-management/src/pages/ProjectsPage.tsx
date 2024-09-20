import { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config.json";
import { AddTask } from "../components/forms";
import { ListShow } from "../components/home";
import { Modal, Task } from "../components/UI";
import { useAuth } from "../store/useAuth";
import { project } from "../types";

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

  useEffect(() => {
    const fetchProject = async () => {
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
        console.log(fetchedProject);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [token, projectId]);

  return (
    <>
      {toggleAddTask && (
        <Modal onClose={toggleAddTaskHandler}>
          <AddTask onClose={toggleAddTaskHandler} />
        </Modal>
      )}

      <div className="w-full rounded border border-gray-300 px-6 py-4 min-h-[450px]">
        <div className="flex justify-between w-full items-center">
          <div className="font-semibold text-3xl">{project.name}</div>

          <IoChevronBackSharp className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => navigate("/")} />
        </div>

        <div className="flex items-start gap-4">
          <ListShow title="تسک ها" toggleModal={toggleAddTaskHandler} btnTitle="اضافه تسک">
            <ul className="">
              {project.tasks?.map((task, index) => (
                <Task key={index} task={task} />
              ))}
            </ul>
          </ListShow>

          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
