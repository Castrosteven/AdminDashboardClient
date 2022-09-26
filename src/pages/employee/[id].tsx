import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Cookies from "universal-cookie";
import { EMPLOYEE, GET_EMPLOYEES } from "../../gql";
import { employee, employee_employee } from "../../gql/__generated__/employee";
import { employees } from "../../gql/__generated__/employees";
import { AuthClient } from "../../utils/AuthClient";

const Employee: NextPage<{ employee: employee_employee }> = ({ employee }) => {
  const { email, firstName, lastName } = employee;
  return (
    <div className="container mx-auto h-full flex flex-col p-6">
      <div className="rounded-md bg-white h-full text-gray-800 p-4">
        <div className="w-full border-b-2 h-10 text-2xl font-semibold">
          {firstName} {lastName}
        </div>
        <div>
          <p>Email {email}</p>
          <p>Project</p>
          <p>Tasks Assigned</p>
        </div>
      </div>
    </div>
  );
};
interface QueryType {
  id: string;
}
export default Employee;
export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const cookies = new Cookies(req.headers.cookie);
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    const { id } = query as unknown as QueryType;
    const client = AuthClient(accessToken);
    const employee = await client.query<employee>({
      query: EMPLOYEE,
      variables: {
        data: {
          id,
        },
      },
    });
    return {
      props: {
        employee: employee.data.employee,
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
