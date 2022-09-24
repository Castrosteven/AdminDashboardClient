import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { EMPLOYEE_MUTATION, GET_EMPLOYEES } from "../gql";
import { employees } from "../gql/__generated__/employees";

export const EmployeeHook = () => {
  const { subscribeToMore, loading, data, error } =
    useQuery<employees>(GET_EMPLOYEES);
  useEffect(() => {
    subscribeToMore({
      document: EMPLOYEE_MUTATION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return subscriptionData.data;
      },
    });
  }, []);
  return {
    employees: data && data.employees,
    loading,
  };
};
