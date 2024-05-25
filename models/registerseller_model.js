const mongoose = require('mongoose');
const register_seller_Schema = new mongoose.Schema({
    seller_id: {
        type: String,
        required: true
    },
    seller_fullname: {
        type: String,
        required: true,
    },
    seller_email: {
        type: String,
        required: true
    },
    seller_password: {
        type: String,
        required: true
    },
    seller_phoneNumber: {
        type: String,
        required: true
    },
    seller_businessName: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const sellers = mongoose.model('sellers', register_seller_Schema);

module.exports = sellers;