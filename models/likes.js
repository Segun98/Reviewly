const mongoose = require('mongoose')

const Likes = new mongoose.Schema({
    ipAddress: {
        type: String,
        unique: true
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Likes', Likes, 'Likes')