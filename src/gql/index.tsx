import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
  mutation signInUser($data: loginUserInputType!) {
    signInUser(data: $data) {
      accessToken
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser($data: createUserInputType!) {
    createUser(data: $data) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const ME = gql`
  query me {
    me {
      email
      firstName
      id
      lastName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($data: updateUserInputType!) {
    updateUser(data: $data) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($data: changePasswordInput!) {
    changePassword(data: $data)
  }
`;

export const MY_COMPANY = gql`
  query myCompany {
    myCompany {
      employees {
        id
        firstName
        lastName
      }
      projects {
        id
        name
      }
      teams {
        id
        name
      }
    }
  }
`;
