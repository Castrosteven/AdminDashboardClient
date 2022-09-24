/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { getEmployeeInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: employee
// ====================================================

export interface employee_employee {
  __typename: "Employee";
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface employee {
  employee: employee_employee;
}

export interface employeeVariables {
  data: getEmployeeInputType;
}
