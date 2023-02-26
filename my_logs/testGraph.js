const { ApolloServer, gql } = require("apollo-server");
const { createReadStream } = require("fs");
const { resolve } = require("path");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { ApolloServerPluginLandingPageDisabled } = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload");
const multer = require("multer");

const typeDefs = gql`
  scalar Upload

  type Query {
    hello: String
  }

  type Mutation {
    uploadFile(file: Upload!): String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },

  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createWriteStream, unlink } = require("fs");
      const { v4: uuidv4 } = require("uuid");
      const { filename, mimetype, createReadStream } = await file;
      const stream = createReadStream();
      const id = uuidv4();
      const path = `./uploads/${id}-${filename}`;
      await new Promise((resolve) =>
        stream
          .pipe(createWriteStream(path))
          .on("finish", () => resolve())
          .on("error", (error) => {
            unlink(path, () => {});
            console.log(error);
          })
      );
      return `http://localhost:4000/${path}`;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [process.env.NODE_ENV === "production" ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground()],
});

const upload = multer();

server.start().then(() => {
  server.applyMiddleware({
    app: upload.none(),
    path: "/graphql",
  });
});

