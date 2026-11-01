import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./backend/src/graphql/typeDefs.ts",
  documents: [
    "./frontend/src/**/*.{graphql,ts,tsx}",
    "!./frontend/src/gql-generated/**",
  ],
  generates: {
    "./backend/src/graphql/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context#GraphQLContext",
        useTypeImports: true,
      },
    },
    "./frontend/src/gql-generated/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
