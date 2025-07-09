// ECHO is on.
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;