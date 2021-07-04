require("dotenv").config();

const typeDefs = require("./GraphQl/typeDef");
const resolvers = require("./GraphQl/Resolver");
const mongoose = require("mongoose");
const CovidData = require("./models/DataModel");
const cors = require("cors");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { makeExecutableSchema } = require("graphql-tools");
const newData = require("./temp");
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

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/data", async (req, res) => {
  console.log(newData);

  await CovidData.insertMany(newData);
  res.send("posted succesfully");
});

app.listen(PORT, () => console.log("app running on ", PORT));

module.exports = app;
