const { addUser, userLogin } = require("../Controllers/UserController");

const { fetchData, fetchTotalData } = require("../Controllers/DataController");

module.exports = {
  Query: {
    getData: (parent, args) => fetchData(args),
    login: (parent, args) => userLogin(args),
    getTotalData: (parent, args) => fetchTotalData(args),
  },
  Mutation: {
    register: (parent, { userData }) => addUser(userData),
  },
};
