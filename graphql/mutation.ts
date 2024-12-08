import { graphql } from "@/gql";

export const createEmployeeTypes = graphql(`
  #graphql
  mutation Mutation(
    $name: String!
    $profileImage: String!
    $gender: String!
    $age: Int!
    $phoneNo: String!
    $email: String!
    $position: String!
  ) {
    createEmployee(
      name: $name
      profileImage: $profileImage
      gender: $gender
      age: $age
      phoneNo: $phoneNo
      email: $email
      position: $position
    ) {
      id
      profileImage
      name
    }
  }
`);
