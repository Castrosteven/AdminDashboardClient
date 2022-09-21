/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createUserInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "User";
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface createUser {
  createUser: createUser_createUser;
}

export interface createUserVariables {
  data: createUserInputType;
}
