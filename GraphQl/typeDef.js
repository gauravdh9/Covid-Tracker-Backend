module.exports = `
  type User{
    id :ID!
    name: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: String
    user: User
  }

  type caseData{
    Hospitalized:Int
    Recovered:Int
    Deceased:Int
    Active:Int
  }

  type Data{
    date:String
    cases:caseData
    prev:caseData
  }

  input UserInput {
    name: String!
    password: String!
    email: String!
  }

  type response{
    message:String
  }

  type totalData{
    Active:String
    Recovered:String
    Deceased:String
    
  }
  type totalResponse{
    total:totalData
    message:String
  }

  type Query {
    getData(start:String!,end:String!):[Data]
    login(email: String!, password: String!): Auth
    getTotalData:totalResponse

  }
  type Mutation {
    register(userData: UserInput): response
  }
  
`;
