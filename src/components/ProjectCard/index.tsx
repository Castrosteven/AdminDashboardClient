import { getProjects_projects } from "../../gql/__generated__/getProjects";
import { projects_projects } from "../../gql/__generated__/projects";

interface Props {
  project: getProjects_projects | null;
}
export const ProjectCard = ({ project }: Props) => {
  if (!project) {
    return null;
  }
  return (
    <div className="bg-gray-400 w-80 h-40 rounded-md flex flex-col gap-5 p-4 hover:bg-gray-600 cursor-pointer text-lg hover:text-white">
      <div>{project.name}</div>
      <div>Tasks: {project.tasks.length}</div>
    </div>
  );
};
