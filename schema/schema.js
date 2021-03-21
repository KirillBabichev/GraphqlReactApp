const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

const movies = [
    { id: '1', name: 'Total Power', genre: 'thriller', directorId: '1'},
    { id: '2', name: 'Garry Potter', genre: 'fantasy', directorId: '2'},
    { id: '3', name: 'Lord of the rings', genre: 'fantasy', directorId: '3'},
    { id: '4', name: 'Dark waters', genre: 'detective', directorId: '4'},
    { id: '5', name: 'Travel to a desert island', genre: 'Adventures', directorId: '5'},
];

const directors = [
	{ id: '1', name: 'Tarantino', age: 55 },
	{ id: '2', name: 'Radford', age: 72 },
	{ id: '3', name: 'James McTeigue', age: 51 },
    { id: '4', name: 'Guy Ritchie', age: 50 },
    { id: '5', name: 'James Cameron', age: 57 },
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
          director: {
              type: DirectorType,
              resolve(parent, args) {
                return directors.find(director => director.id === parent.id);
            }
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      movie: {
        type: MovieType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return movies.find(movie => movie.id === args.id);
        },
      },
          director: {
        type: DirectorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return directors.find(director => director.id === args.id);
        },
      },
    }
  });

module.exports = new GraphQLSchema({
    query: Query,
});
