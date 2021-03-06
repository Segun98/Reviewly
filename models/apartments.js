const mongoose = require('mongoose')

const Apartments = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Apartments', Apartments, 'Apartments')