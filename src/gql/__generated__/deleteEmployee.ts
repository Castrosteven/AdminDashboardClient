/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { getEmployeeInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEmployee
// ====================================================

export interface deleteEmployee_deleteEmployee {
  __typename: "Employee";
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface deleteEmployee {
  deleteEmployee: deleteEmployee_deleteEmployee;
}

export interface deleteEmployeeVariables {
  data: getEmployeeInputType;
}
