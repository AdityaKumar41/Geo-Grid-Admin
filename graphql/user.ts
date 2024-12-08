import { graphql } from "@/gql";

export const GetSignedURL = graphql(`#graphql
  #graphql
  query getSignedURL($fileName: String!, $fileType: String!) {
    getSignedURL(fileName: $fileName, fileType: $fileType)
  }
`);
