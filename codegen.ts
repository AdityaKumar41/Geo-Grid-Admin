import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql", // Ensure this endpoint is accessible
  documents: "src/graphql/**/*.{graphql,gql,ts}", // Include .ts files if you define queries in them
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  ignoreNoDocuments: true, // Add this to avoid errors if no documents are found
};

export default config;
