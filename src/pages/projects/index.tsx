import type { GetServerSideProps, NextPage } from "next";
import Cookies from "universal-cookie";

const Projects: NextPage = () => {
  return (
    <div className="container mx-auto h-full flex justify-center items-center">
      <div>Projects PAGE</div>
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
