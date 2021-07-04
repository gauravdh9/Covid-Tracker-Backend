require("dotenv").config();

const typeDefs = require("./GraphQl/typeDef");
const resolvers = require("./GraphQl/Resolver");
const mongoose = require("mongoose");
const CovidData = require("./models/DataModel");
const cors = require("cors");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { makeExecutableSchema } = require("graphql-tools");
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", () => {
  console.log("unable to connect to mongodb");
});

const PORT = process.env.PORT || 4000;

var app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Covid Tracker Backend Api",
    graphiql: "https://covid-trackerbackend.herokuapp.com/graphql",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log("app running on ", PORT));

module.exports = app;
