import { useState } from "react";
import { BASE_URL } from "../../../config.json";
import { useAuth } from "../../store/useAuth";
import { project } from "../../types";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setprojects] = useState<project[]>(user.projects);
  console.log(projects);

  const deleteprojectHandler = async (projectId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          jwt: user.token,
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} onDelete={deleteprojectHandler} />
      ))}
    </div>
  );
};

export default Projects;
