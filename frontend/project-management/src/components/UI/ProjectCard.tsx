import { IoTrashOutline } from "react-icons/io5";
import { project } from "../../types";
import Badge from "./Badge";

interface ProjectCardProps {
  project: project;
  onDelete: (projectId: string) => Promise<void>;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  return (
    <div className="rounded-lg border border-gray-400 bg-white hover:bg-[#f8f9fa] transition-all ease-in duration-200 px-4 py-2 w-full sm:w-1/2 cursor-pointer">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-base font-medium">{project.name}</h3>

        <button
          type="button"
          className="bg-white outline-none border-2 border-red-600 text-red-600 py-1 px-2 rounded transition-all ease-in duration-200 hover:bg-red-600 hover:text-white"
          onClick={() => {
            if (project._id) onDelete(project._id);
            else console.error("Project ID is undefined.");
          }}
        >
          <IoTrashOutline className="w-6 h-6" />
        </button>
      </div>
      <p className="text-sm font-normal text-gray-500 flex items-center gap-1 mt-2">
        <span className="font-medium text-sm text-gray-800">توضیحات :</span>
        {project.description}
      </p>

      <div className="flex items-center flex-wrap gap-3 mt-6">
        {project.technologies.map((tech, index) => (
          <Badge key={index}>{tech}</Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
