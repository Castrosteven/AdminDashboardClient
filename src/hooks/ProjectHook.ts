import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PROJECTS, PROJECT_MUTATION } from "../gql";

import { getProjects } from "../gql/__generated__/getProjects";

export const ProjectHook = () => {
  const { subscribeToMore, loading, data, error } =
    useQuery<getProjects>(GET_PROJECTS);
  useEffect(() => {
    subscribeToMore({
      document: PROJECT_MUTATION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return subscriptionData.data;
      },
    });
  }, []);
  return {
    projects: data && data.projects,
    loading,
  };
};
