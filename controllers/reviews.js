const Reviews = require("../models/reviews")

/* 
POST api/review/create
*/
async function createReview(req, res, next) {
    const {
        landlordReview,
        environmentReview,
        amenitiesReview,
        image,
        name,
        apartmentId
    } = req.body

    if (!apartmentId) {
        return res.status(400).send('send apartment id')
    }

    try {
        await Reviews.create({
            userId: req.payload.user_id,
            apartmentId,
            name,
            landlordReview,
            environmentReview,
            amenitiesReview,
            image
        })
        res.status(201).send('success!')
    } catch (err) {
        res.status(400).send(err.message)
    }
}


/* 
GET api/reviews/:id
fetches all reviews under an apartment, expects apartment id in parameter
*/
async function getReviews(req, res, next) {

    try {
        const review = await Reviews.find({
            apartmentId: req.params.id
        })

        res.status(200).json(review)

    } catch (err) {
        res.status(400).send(err.message)
    }
}


/* 
PUT api/review/:id
*/
async function updateReview(req, res, next) {
    const {
        landlordReview,
        environmentReview,
        amenitiesReview,
        image,
    } = req.body

    try {
        await Reviews.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                landlordReview,
                environmentReview,
                amenitiesReview,
                image,
            }
        })

        res.status(200).send('updated')

    } catch (err) {
        res.status(400).send(err.message)
    }
}

/* 
DELETE api/review/:id
expects review _id 
*/
async function deleteReview(req, res, next) {
    try {
        const review = await Reviews.findOne({
            _id: req.params.id
        })
        await review.remove()

        res.status(200).send('success')

    } catch (err) {
        res.status(400).send(err.message)
    }
}



/* 
POST api/review/upvote
give an upvote.
expects the _id of the review being upvoted.
duplicates are prevented with ip address
*/
async function upVote(req, res, next) {
    const {
        reviewId
    } = req.body


    try {
        //check if user has liked this post via their ip address
        const checkIfLiked = await Reviews.find({
            _id: reviewId
        }, {
            "upvotes.ipAddress": req.ip
        })

        //upvote without checks if there's no previous upvote by any user
        if (checkIfLiked[0].upvotes.length === 0) {
            await Reviews.findOneAndUpdate({
                _id: reviewId
            }, {
                $push: {
                    upvotes: {
                        "ipAddress": req.ip,
                    }
                },
                $inc: {
                    count: 1
                }
            });

            return res.status(201).send('success!')

        }

        //loop through ip addresses, check if user's ip matches with existing ip addresses, decrement count and remove upvote if it matches

        for (let i = 0; i < checkIfLiked[0].upvotes.length; i++) {

            if (checkIfLiked[0].upvotes[i].ipAddress === req.ip) {

                await Reviews.findOneAndUpdate({
                    _id: reviewId
                }, {
                    $pull: {
                        upvotes: {
                            ipAddress: req.ip
                        }
                    },
                    $inc: {
                        count: -1
                    }

                })
                return res.send('unliked!')
            }

        }

        //finally add upvotes and increment count if the condtions above weren't met
        await Reviews.findOneAndUpdate({
            _id: reviewId
        }, {
            $push: {
                upvotes: {
                    "ipAddress": req.ip,
                }
            },
            $inc: {
                count: 1
            }
        });

        res.status(201).send('success!')



    } catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports = {
    createReview,
    updateReview,
    deleteReview,
    upVote,
    getReviews
}