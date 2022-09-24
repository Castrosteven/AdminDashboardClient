import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { EMPLOYEE_MUTATION, GET_EMPLOYEES, GET_PROJECTS } from "../gql";

import { getProjects } from "../gql/__generated__/getProjects";

export const ProjectHook = () => {
  const { subscribeToMore, loading, data, error } =
    useQuery<getProjects>(GET_PROJECTS);
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
    employees: data && data.projects,
    loading,
  };
};
