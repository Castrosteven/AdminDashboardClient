/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createProjectInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createProject
// ====================================================

export interface createProject_createProject_tasks {
  __typename: "Task";
  description: string;
  id: string;
  name: string;
}

export interface createProject_createProject {
  __typename: "Project";
  id: string;
  name: string;
  tasks: (createProject_createProject_tasks | null)[];
}

export interface createProject {
  createProject: createProject_createProject;
}

export interface createProjectVariables {
  data: createProjectInput;
}
