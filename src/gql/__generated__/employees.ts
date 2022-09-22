/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: employees
// ====================================================

export interface employees_employees {
  __typename: "Employee";
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

export interface employees {
  employees: (employees_employees | null)[];
}
