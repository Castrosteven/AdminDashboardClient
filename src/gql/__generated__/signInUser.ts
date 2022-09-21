/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { loginUserInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signInUser
// ====================================================

export interface signInUser_signInUser {
  __typename: "accessToken";
  accessToken: string;
}

export interface signInUser {
  signInUser: signInUser_signInUser;
}

export interface signInUserVariables {
  data: loginUserInputType;
}
