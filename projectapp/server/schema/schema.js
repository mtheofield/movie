const Stock = require('../models/Destination');
const Member = require('../models');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,

} = require('graphql');


// Setting the stock type

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
        return Member.findById(parent.memberId);
      },
    },
  }),
});


// setting member type

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
    stock: {
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


// setting the mutations

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Adding a member
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

    // Deleting a member
    deleteMember: {
      type: MemberType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Stock.find({ memberId: args.id }).then((stocks) => {
          stocks.forEach((stock) => {
            stock.remove();
          });
        });

        return Member.findByIdAndRemove(args.id);
      },
    },

    // Adding a stock
    addStock: {
      type: StockType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'StockStatus',
            values: {
              new: { value: 'New' },
              progress: { value: 'Progress' },
              finished: { value: 'Finished' },
            },
          }),
          defaultValue: 'Finished',
        },
        memberId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const stock = new Stock({
          name: args.name,
          description: args.description,
          status: args.status,
          memberId: args.memberId,
        });

        return stock.save();
      },
    },


    // Deleting a stock
    deleteStock: {
      type: StockType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Stock.findByIdAndRemove(args.id);
      },
    },


    // Updating a stock
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
              new: { value: 'New' },
              progress: { value: 'Progress' },
              finished: { value: 'Finished' },
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

