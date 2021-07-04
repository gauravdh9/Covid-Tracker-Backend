const { Schema, model } = require("mongoose");
const DataSchema = new Schema({
  date: {
    type: Date,
  },
  cases: {
    Hospitalized: { type: Number },
    Recovered: { type: Number },
    Deceased: { type: Number },
    Active: { type: Number },
  },
  prev: {
    Hospitalized: { type: Number },
    Recovered: { type: Number },
    Deceased: { type: Number },
    Active: { type: Number },
  },
});

module.exports = model("CovidData", DataSchema);
