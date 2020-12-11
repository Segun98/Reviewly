const router = require("express").Router()
const {
    verifyJwt
} = require("../helpers/auth")
const {
    createReview,
    updateReview,
    deleteReview,
    upVote,
    getReviews
} = require("../controllers/reviews")


router.post('/review/create', verifyJwt, createReview)

router.get('/reviews/:id', getReviews)

router.route('/review/:id', verifyJwt)
    .put(updateReview)
    .delete(deleteReview)

router.post('/review/upvote', upVote)

module.exports = router