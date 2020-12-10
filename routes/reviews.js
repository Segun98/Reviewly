const router = require("express").Router()
const {
    getReviews
} = require("../controllers/reviews")


router.get('/reviews', getReviews)

module.exports = router