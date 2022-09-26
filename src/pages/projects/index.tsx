import type { GetServerSideProps, NextPage } from "next";
import Cookies from "universal-cookie";
import { ProjectCard } from "../../components/ProjectCard";
import { WithData } from "../../contexts/DataContext";
import { Button } from "../../components/Button";
import { ModalWrapper } from "../../components/ModalWrapper";
import { useState } from "react";
import { NewProjectForm } from "../../components/NewProjectForm";
import { ProjectHook } from "../../hooks/ProjectHook";
const Projects: NextPage = () => {
  const { projects, loading } = ProjectHook();
  const [modal, setModal] = useState(false);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="container mx-auto h-full flex flex-col p-6">
      <div className="rounded-md bg-white h-full text-gray-800 p-4">
        <div className="w-full border-b-2 h-10 text-2xl font-semibold">
          Projects Page
        </div>
        {modal ? (
          <ModalWrapper setModal={setModal}>
            <NewProjectForm setModal={setModal} />
          </ModalWrapper>
        ) : (
          <div className="h-full flex flex-col">
            <div className="h-20 flex justify-end">
              <div className="pt-10">
                <Button
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  Create A New Project
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 p-5">
              {projects &&
                projects.map((project, i) => {
                  return <ProjectCard key={i} project={project} />;
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    return {
      props: {},
    };
  }
  return {
    props: {},
    redirect: {
      destination: "/login",
    },
  };
};
