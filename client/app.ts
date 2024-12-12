import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient("http://localhost:4000/graphql",{
    headers:() => {
        const token = sessionStorage.getItem("token");
        return {
            Authorization: token ? `Bearer ${token}` : " "
        }
    },
});
