const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const movies = [
    { id: '1', name: 'Total Power', genre: 'thriller'},
    { id: '2', name: 'Garry Potter', genre: 'fantasy'},
    { id: '3', name: 'Lord of the rings', genre: 'fantasy'},
    { id: '4', name: 'Dark waters', genre: 'detective'},
    { id: '5', name: 'Travel to a desert island', genre: 'Adventures'},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { 
            type: GraphQLID 
        },
        name: { 
            type: GraphQLString 
        },
        genre: { 
            type: GraphQLString 
        },
    }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find(movie => movie.id == args.id);
      },
    },
  }
});

module.exports = new GraphQLSchema({
    query: Query,
  });
