/**
 * GraphQl Schema 
 */
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema,
      resolvers            = require('./resolvers');

const typeDefs = `
   type Product {
      _id: ID!
      title: String!
      inventory_count: Int!
      price: Int!
     }
   type Cart{
        products:[Product]!
        total_price :Int!
      }
   type Query {
      allProducts(inStoke:Boolean): [Product],
      getProductByName(title:String!,inStoke:Boolean): Product,
      getProductById(_id:ID!,inStoke:Boolean): Product,
      Cart:Cart
     }
   input ProductInput {
        title: String!
        inventory_count: Int!
        price: Int!
       }
   type Mutation {
         createProduct(input: ProductInput) : Product
         addToCart(title:String!): Cart
         buyProducts: [Product]
       }
    `;
    
const schema = makeExecutableSchema({
   typeDefs,
   resolvers
});
module.exports = schema;