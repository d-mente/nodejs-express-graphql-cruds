const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// create schema

const schema = buildSchema(`
  type User {
    id: Int
    username: String
    name: String
  }
  type Query {
    users: [User]
    user(id: Int): User
  }
  type Mutation {
    addUser(username: String!, name: String): User
    updateUser(id: Int, username: String, name: String): User
    deleteUser(id: Int): User
  }
`);

var users = [];
var counter = 0;

// create CRUD functions

const root = {
    users: () => users,

    user: (data) => {
        const element = users.find((el) => el.id == data.id);

        return element;
    },

    addUser: (args) => {
        const item = {
            ...args,
            id: counter,
        };

        users.push(item);
        counter++;
        return item;
    },

    // this is used for patch
    updateUser: (args) => {
        const elId = users.findIndex((el) => el.id == args.id);
        if (elId >= 0) {
            users[elId] = {
                ...users[elId],
                ...args,
            };
            return users[elId];
        }
        return null;
    },

    deleteUser: (args) => {
        const elId = users.findIndex((el) => el.id == args.id);

        if (elId >= 0) {
            users.splice(elId, 1);
            return {
                id: args.id,
            };
        }
        return null;
    },
};

// create express server
const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);
app.listen(3001);
console.log("it woks! go http://looalhost:3001/graphql");
