import { graphql } from "@/gql";

export const createEmployeeTypes = `
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      name
      email
      position
      profileImage
      gender
      age
      phoneNo
    }
  }
`;