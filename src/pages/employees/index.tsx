import { useQuery } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button } from "../../components/Button";
import { EmployeeTable } from "../../components/EmployeeTable";
import { ModalWrapper } from "../../components/ModalWrapper";
import { NewEmployeeForm } from "../../components/NewEmployeeForm";
import { EMPLOYEE_MUTATION, GET_EMPLOYEES } from "../../gql";
import { employees } from "../../gql/__generated__/employees";
const Employees: NextPage = () => {
  const { subscribeToMore, loading, data, error } =
    useQuery<employees>(GET_EMPLOYEES);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    subscribeToMore({
      document: EMPLOYEE_MUTATION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return subscriptionData.data;
      },
    });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>error ${error.message}</div>;
  }
  return (
    <div className="container mx-auto  flex justify-center items-center w-full p-4 h-full">
      <div className="rounded-md bg-white h-full text-gray-800 p-4 w-full">
        {modal ? (
          <ModalWrapper setModal={setModal}>
            <NewEmployeeForm setModal={setModal} />
          </ModalWrapper>
        ) : (
          <div className="h-full">
            <div className="h-20 flex justify-end">
              <div>
                <Button
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  Create A New Employee
                </Button>
              </div>
            </div>
            {data && <EmployeeTable employees={data.employees} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;

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
