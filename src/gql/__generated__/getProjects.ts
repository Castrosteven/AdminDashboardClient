/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProjects
// ====================================================

export interface getProjects_projects_tasks {
  __typename: "Task";
  description: string;
}

export interface getProjects_projects {
  __typename: "Project";
  id: string;
  name: string;
  tasks: (getProjects_projects_tasks | null)[];
}

export interface getProjects {
  projects: (getProjects_projects | null)[];
}
