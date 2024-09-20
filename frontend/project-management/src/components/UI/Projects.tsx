import { BASE_URL } from "../../../config.json";
import { useAuth } from "../../store/useAuth";
import { project } from "../../types";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { user, fetchUser, token } = useAuth();

  const deleteprojectHandler = async (projectId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          jwt: token,
        },
      });
      const data = await res.json();
      console.log(data);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 justify-between">
      {user.projects.map((project: project) => (
        <ProjectCard key={project._id} project={project} onDelete={deleteprojectHandler} />
      ))}
    </div>
  );
};

export default Projects;
