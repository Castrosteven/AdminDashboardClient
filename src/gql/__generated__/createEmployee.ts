/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createEmployeeInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createEmployee
// ====================================================

export interface createEmployee_createEmployee {
  __typename: "Employee";
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface createEmployee {
  createEmployee: createEmployee_createEmployee;
}

export interface createEmployeeVariables {
  data: createEmployeeInput;
}
