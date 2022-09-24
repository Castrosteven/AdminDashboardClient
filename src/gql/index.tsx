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
        email
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

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($data: createEmployeeInput!) {
    createEmployee(data: $data) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const EMPLOYEE_MUTATION = gql`
  subscription employees {
    employees {
      email
      firstName
      lastName
      id
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      email
      firstName
      id
      lastName
    }
  }
`;

export const EMPLOYEE = gql`
  query employee($data: getEmployeeInputType!) {
    employee(data: $data) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($data: getEmployeeInputType!) {
    deleteEmployee(data: $data) {
      email
      firstName
      id
      lastName
    }
  }
`;

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      tasks {
        description
      }
    }
  }
`;
