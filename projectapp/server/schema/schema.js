const Stock = require('../models/Stock');
const Member = require('../models/Member');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Stock Type
const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    member: {
      type: MemberType,
      resolve(parent, args) {
        return Member.findById(parent.stockId);
      },
    },
  }),
});

// Member Type
const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    stocks: {
      type: new GraphQLList(StockType),
      resolve(parent, args) {
        return Stock.find();
      },
    },
    stocks: {
      type: StockType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Stock.findById(args.id);
      },
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve(parent, args) {
        return Member.find();
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Member.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a member
    addMember: {
      type: MemberType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const member = new Member({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return member.save();
      },
    },
    // Delete a member
    deleteMember: {
      type: MemberType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Stock.find({ stockId: args.id }).then((stocks) => {
          stocks.forEach((stock) => {
            stock.remove();
          });
        });

        return Member.findByIdAndRemove(args.id);
      },
    },
    // Add a stock
    addStock: {
      type: StockType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'StockStatus',
            values: {
              new: { value: 'Not In' },
              progress: { value: 'In Stock' },
              completed: { value: 'Finished' },
            },
          }),
          defaultValue: 'In Stock',
        },
        stockId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const stock = new Stock({
          name: args.name,
          description: args.description,
          status: args.status,
          stockId: args.stockId,
        });

        return stock.save();
      },
    },
    // Delete a stock
    deleteStock: {
      type: StockType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Stock.findByIdAndRemove(args.id);
      },
    },
    // Update a stock
    updateStock: {
      type: StockType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'StockStatusUpdate',
            values: {
              new: { value: 'Not In' },
              progress: { value: 'In Stock' },
              completed: { value: 'Finished' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Stock.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
