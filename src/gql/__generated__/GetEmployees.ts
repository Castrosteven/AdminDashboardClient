/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEmployees
// ====================================================

export interface GetEmployees_employees {
  __typename: "Employee";
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface GetEmployees {
  employees: (GetEmployees_employees | null)[];
}
