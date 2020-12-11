const mongoose = require('mongoose')

const Reviews = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    apartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartments"
    },
    name: {
        type: String,
        required: true
    },
    landlordReview: String,
    environmentReview: String,
    amenitiesReview: String,
    image: String,
    upvotes: [{
        ipAddress: {
            type: String,
            default: ""
        }
    }],
    count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Reviews', Reviews, 'Reviews')