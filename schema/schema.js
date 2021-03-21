const graphql = require('graphql');

const { GraphQLInputObjectType, GraphQLString } = graphql;

const MovieType = new GraphQLInputObjectType({
    name: 'Movie',
    fields: () => ({
        id: { 
            type: GraphQLString 
        },
        name: { 
            type: GraphQLString 
        },
        genre: { 
            type: GraphQLString 
        },
    }),
})