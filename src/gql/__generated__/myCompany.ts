/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myCompany
// ====================================================

export interface myCompany_myCompany_employees {
  __typename: "Employee";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface myCompany_myCompany_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface myCompany_myCompany_teams {
  __typename: "Team";
  id: string;
  name: string;
}

export interface myCompany_myCompany {
  __typename: "Company";
  employees: (myCompany_myCompany_employees | null)[];
  projects: (myCompany_myCompany_projects | null)[];
  teams: (myCompany_myCompany_teams | null)[];
}

export interface myCompany {
  myCompany: myCompany_myCompany;
}
