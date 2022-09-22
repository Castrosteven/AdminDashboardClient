import type { GetServerSideProps, NextPage } from "next";
import Cookies from "universal-cookie";
import { DashboardCard } from "../components/DashboardCard";
import { MY_COMPANY } from "../gql";
import { myCompany, myCompany_myCompany } from "../gql/__generated__/myCompany";
import { AuthClient } from "../utils/AuthClient";

const Home: NextPage<{ company: myCompany_myCompany }> = ({ company }) => {
  const numOfEmployees = company.employees.length;
  const numOfTeams = company.teams.length;
  const numOfProjects = company.projects.length;
  return (
    <div className="container mx-auto h-full flex p-4">
      <div className="grid gap-5 grid-cols-3 w-full">
        <DashboardCard path="/employees">
          <div className="flex items-center flex-row h-full justify-evenly">
            <div className="font-semibold">Employees</div>
            <div className="text-2xl">{numOfEmployees}</div>
          </div>
        </DashboardCard>
        <DashboardCard path="/teams">
          <div className="flex items-center flex-row h-full justify-evenly">
            <div className="font-semibold">Teams</div>
            <div className="text-2xl">{numOfTeams}</div>
          </div>
        </DashboardCard>
        <DashboardCard path="/projects">
          <div className="flex items-center flex-row h-full justify-evenly">
            <div className="font-semibold">Projects</div>
            <div className="text-2xl">{numOfProjects}</div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    const clinet = AuthClient(accessToken);
    const { data } = await clinet.query<myCompany>({
      query: MY_COMPANY,
    });
    return {
      props: {
        company: data.myCompany,
      },
    };
  }
  return {
    props: {},
    redirect: {
      destination: "/login",
    },
  };
};
