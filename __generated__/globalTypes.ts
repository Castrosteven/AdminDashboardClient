/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface changePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface createEmployeeInput {
  email: string;
  firstName: string;
  lastName: string;
}

export interface createProjectInput {
  name: string;
}

export interface createUserInputType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface getEmployeeInputType {
  id: string;
}

export interface loginUserInputType {
  email: string;
  password: string;
}

export interface updateUserInputType {
  firstName: string;
  lastName: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
