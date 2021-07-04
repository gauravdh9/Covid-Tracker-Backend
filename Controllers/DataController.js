const CovidData = require("../models/DataModel");

exports.fetchData = async ({ start, end }) => {
  const newend = end.split("/");
  newend[1] = Number(newend[1]) + 1;
  const endDate = newend.join("/");
  try {
    const data = await CovidData.find({
      date: {
        $gt: new Date(start),
        $lte: new Date(end),
      },
    });
    const temp = JSON.parse(JSON.stringify(data));
    return temp;
  } catch (err) {
    throw new Error(err);
  }
};

exports.fetchTotalData = async () => {
  try {
    const total = { Active: 0, Recovered: 0, Deceased: 0 };
    const newData = await CovidData.find({});
    newData.forEach((element) => {
      total.Active += element.cases["Active"];
      total.Deceased += element.cases["Deceased"];
      total.Recovered += element.cases["Recovered"];
    });
    return { total: total, message: "Data Received" };
  } catch (error) {
    throw new Error(error);
  }
};
