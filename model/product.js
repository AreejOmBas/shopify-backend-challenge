/**
 * Product Schema(DB)
 */
const  mongoose = require('mongoose'),
       Schema = mongoose.Schema;

const ProductSchema = new Schema({
title: {
        type: String,
        required: true
    },
    inventory_count: {
        type: Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('Product', ProductSchema,'storeproducts')
