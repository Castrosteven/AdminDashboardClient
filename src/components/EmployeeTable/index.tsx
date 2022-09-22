import { employees_employees } from "../../gql/__generated__/employees";
import { myCompany_myCompany } from "../../gql/__generated__/myCompany";

interface Props {
  employees: (employees_employees | null)[];
}
export const EmployeeTable = ({ employees }: Props) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              First Name
            </th>
            <th scope="col" className="py-3 px-6">
              Last Name
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee, index) => {
              if (employee) {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {employee.firstName}
                    </th>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                  </tr>
                );
              }
              return null;
            })}
        </tbody>
      </table>
    </div>
  );
};
