import {arch} from "os";

const database = require('./database');
import { ApolloServer, gql } from 'apollo-server';
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
    people: [People]
    person(id: Int): People
  }
  
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String 
    supplies: [Supply]
  }
 
  type Equipment {
    id: String
    user_by: String
    count: Int
    new_or_used: String
  }
  
  type Supply {
    id: String
    team: Int
  }
  
  type People {
    id: Int,
    first_name: String,
    last_name: String,
    sex: String,
    blood_type: String,
    serve_years: Int,
    role: String,
    team: Int,
    from: String
  }
`
const resolvers = {
    Query: {
        teams: () => database.teams.map((team) => {
            team.supplies = database.supplies.filter((supply) => {
                return supply.team === team.id
            })
            return team;
        }),
        team: (parent, args, context, info) => database.teams.find((team) => {
            return team.id === args.id
        }),
        equipments: () => database.equipments,
        supplies: () => database.supplies,
        people: () => database.people,
        person: (parent, args, context, info) => database.people.find((person) => {
            return person.id === args.id
        })
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server
    .listen()
    .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});