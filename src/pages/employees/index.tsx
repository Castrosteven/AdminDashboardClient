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
  const [modal, setModal] = useState(false);

  return (
    <div className="container mx-auto flex-col  flex justify-center items-center w-full p-6 h-full">
      <div className="rounded-md bg-white h-full text-gray-800 p-4 w-full">
        <div className="w-full border-b-2 h-10 text-2xl font-semibold">
          Employees Page
        </div>
        {modal ? (
          <ModalWrapper setModal={setModal}>
            <NewEmployeeForm setModal={setModal} />
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
                  Create A New Employee
                </Button>
              </div>
            </div>
            {<EmployeeTable />}
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
