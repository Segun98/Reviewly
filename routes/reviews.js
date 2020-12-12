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

router.route('/review/:id')
    .put(verifyJwt, updateReview)
    .delete(verifyJwt, deleteReview)

router.post('/review/upvote', upVote)

module.exports = router