import { createContext, ReactNode, useContext } from "react";
import { employees_employees } from "../gql/__generated__/employees";
import { getProjects_projects } from "../gql/__generated__/getProjects";
import { EmployeeHook } from "../hooks/EmployeeHook";
import { ProjectHook } from "../hooks/ProjectHook";

interface Context {
  employees: (employees_employees | null)[] | undefined;
  projects: (getProjects_projects | null)[] | undefined;

  loading: boolean;
}
export const Context = createContext({} as Context);

export const DataWrapper = ({ children }: { children: ReactNode }) => {
  const { employees, loading } = EmployeeHook();
  const { projects } = ProjectHook();

  return (
    <Context.Provider
      value={{
        loading,
        employees,
        projects,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const WithData = () => {
  return useContext(Context);
};
