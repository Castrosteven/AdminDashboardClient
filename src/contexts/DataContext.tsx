import { createContext, ReactNode, useContext } from "react";
import { employee, employee_employee } from "../gql/__generated__/employee";
import { employees, employees_employees } from "../gql/__generated__/employees";
import { EmployeeHook } from "../hooks/EmployeeHook";

interface Context {
  employees: (employees_employees | null)[] | undefined;
  loading: boolean;
}
export const Context = createContext({} as Context);

export const DataWrapper = ({ children }: { children: ReactNode }) => {
  const { employees, loading } = EmployeeHook();
  return (
    <Context.Provider
      value={{
        loading,
        employees,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const WithData = () => {
  return useContext(Context);
};
