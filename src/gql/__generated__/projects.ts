/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: projects
// ====================================================

export interface projects_projects_tasks {
  __typename: "Task";
  description: string;
  id: string;
  name: string;
}

export interface projects_projects {
  __typename: "Project";
  id: string;
  name: string;
  tasks: (projects_projects_tasks | null)[];
}

export interface projects {
  projects: (projects_projects | null)[];
}
