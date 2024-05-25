const mongoose = require('mongoose');
const register_buyer_Schema = new mongoose.Schema({
    buyer_id: {
        type: String,
        required: true
    },
    buyer_fullname: {
        type: String,
        required: true,
    },
    buyer_email: {
        type: String,
        required: true
    },
    buyer_password: {
        type: String,
        required: true
    },
    buyer_phoneNumber: {
        type: String,
        required: true
    },
    buyer_likedProperties: {
        type: [String],
        default: []
    }
});

// Create a model from the schema
const buyers = mongoose.model('buyers', register_buyer_Schema);

module.exports = buyers;