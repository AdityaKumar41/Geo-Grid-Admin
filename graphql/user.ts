import { gql } from "graphql-tag";

export const GetSignedURL = gql`
  query GetSignedUrl($fileName: String!, $fileType: String!) {
    getSignedUrl(fileName: $fileName, fileType: $fileType)
  }
`;

export const getAdmin = gql`
  query UseAdmin {
  useAdminData {
    id
    email
    profileImage
    name
  }
}
`;

export const verifyAdminQuery = gql`
  query VerifyAdmin($email: String!, $password: String!) {
    VerifyAdmin(email: $email, password: $password)
  }
`;

export const getEmployees = gql`
  query Employees {
  employees {
    id
    name
    email
    profileImage
    position
   
  }
}
`;
