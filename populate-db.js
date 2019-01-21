#! /usr/bin/env node

/**
 * //console.log('This script populates fake product data and save insert them into the  database. 
 * Specified database as argument - e.g.: populate-db mongodb://areej:password1@ds257564.mlab.com:57564/shopify-storedb);

 */
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
const   faker    = require('faker')//pakege required to generate fake data,
        fs       = require('fs')//node module to write to file,
        mongoose = require('mongoose')//database pakage;
        mongoDB  = userArgs[0]//DB URL,
        Product  = require('./model/product')//Database schema;
//var async = require('async');


mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var fakeProducts = [];
/**
 * Loop to generate 10 fake products
 */
for (let i = 0 ; i< 10 ; i++){
    fakeProducts.push({title:faker.commerce.productName(),
                    price:parseInt(faker.commerce.price()),inventory_count:4});
}
/**
 * Insert fakeProducts into DB and then write them to file prodcuts.json for refrence
 */
Product.insertMany(fakeProducts, function (err, docs) {
    if (err){ 
        return console.error(err);
    }
    else {
        console.log("Multiple documents inserted to Collection");
        //writing to file products.json
        fs.writeFile("./products.json", JSON.stringify(docs,null,4),function(err){
        if(err) console.log(err)
        else
            mongoose.connection.close();//close connection to DB
     });
    }
  });





