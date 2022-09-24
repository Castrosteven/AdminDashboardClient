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

const Project: NextPage<{ employee: employee_employee }> = ({ employee }) => {
  const { email, firstName, lastName } = employee;
  return <div>{firstName}</div>;
};
interface QueryType {
  id: string;
}
export default Project;
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
