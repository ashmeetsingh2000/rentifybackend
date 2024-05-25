const mongoose = require('mongoose');
const property_Schema = new mongoose.Schema({
    seller_id: {
        type: String,
        required: true
    },
    product_title: {
        type: String,
        required: true,
    },
    product_location: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_bedrooms: {
        type: String,
        required: true
    },
    product_bathrooms: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_likes: {
        type: Number,
        default: 0,
        min: 0
    }

});

// Create a model from the schema
const properties = mongoose.model('properties', property_Schema);

module.exports = properties;