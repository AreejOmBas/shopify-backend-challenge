
/*
 *  resolver fuctions 
 */

const Product   = require('../model/product');//DB Collection refrence
const Cart      = require('./cart');//cart class
let cart        = new Cart(); //cart object

 const resolvers = {
    Query: {
        /**
         * 
         * @param {*} root entry point to the GraphQl Api 
         * @param {*} inStoke (optional field) if true function will return products with inventory_count > 0.
         */
         async allProducts(root,{inStoke}){
            if(inStoke)
           return await Product.find({inventory_count: { $gt: 0} });
            else
            return await Product.find();
         },
         /**
          * 
          * @param {*} root entry point to the GraphQl Api 
          * @param {*} title is the title of the product 
          * @param {*} inStoke optional flag 
          * returns a product by its title, inventory_count > 0 if the inStoke flag is true
          */
         async getProductByName(root,{title,inStoke}){
            let result = await Product.findOne({title:title});
            if(inStoke && result.inventory_count === 0){
                    throw new Error("Product is out of stoke")
                   
                }
                else if((inStoke && result.inventory_count > 0 ) || !inStoke){
                     return result;
                }
                else{
                    throw new Error("Product not found")
                }
            
        },
        /**
         * 
         * @param {*} root entry point to the GraphQl Api 
         * @param {*} _id ID of the product 
         * @param {*} inStoke optional flag 
          * returns a product by its id, inventory_count > 0 if the inStoke flag is true
         */
        async getProductById(root,{_id,inStoke}){
            let result = await Product.findById(_id);
            if(inStoke && result.inventory_count === 0){
                    throw new Error("Product is out of stoke")
                }
                else if((inStoke && result.inventory_count > 0 ) || !inStoke){
                     return result;
                }
                else{
                    throw new Error("Product not found")
                }
            
         },
         /**
          * 
          * @param {*} root entry point to GraphQL API
          * returns the Cart object
          */
         Cart(root){
             return cart
         }
        },
         Mutation: {
             /**
              * 
              * @param {*} root 
              * @param {*} input is object of type ProductInput (defined in schema.js) 
              * creats  a product and save it to the database
              * return Product
              */
            async createProduct(root, {input}){
               return await Product.create(input);
            },
            /**
             * 
             * @param {*} root 
             * @param {*} title product titel
             * adds a product to the cart, returns cart 
             */
            async addToCart(root,{title}){
             let product = await Product.findOne({$and:[{title:title},{inventory_count: { $gt: 0} }]}); 
             //console.log(typeof(product))
                //     {$inc: {inventory_count: -1}},{new:true});
                     if(!product)
                         throw new Error ("Product is either not found or out of Stoke")
                    else {
                        cart.addProduct(product);
                        return cart 
                    }
                         
            },
            /**
             * 
             * @param {*} root 
             * reduces inventory of products in cart and remove them from cart
             * returns the purchased products with updated inventory count
             */
             async buyProducts(root){
                const products = cart.products.slice(); //clone cart.products array
                 let promises = [];
                           
                if(products.length ===0){
                    throw new Error("Cart is empty")
                }
               //for each product in cart, perform an update where the inventory count is reduced by one              
                products.forEach(function(product){
                 promises.push(Product.findOneAndUpdate({title:product.title},{$inc: {inventory_count: -1}},{new:true})
                )})
               return promises;        
            }   
        }
    };


module.exports=resolvers;
   