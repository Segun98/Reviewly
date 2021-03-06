const Reviews = require("../models/reviews")

/* 
POST api/v1/review/create
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
GET api/v1/reviews/:id
fetches all reviews under an apartment, expects apartment id in parameter.
expects a query of what it should be sorted by. - date || votes
*/
async function getReviews(req, res, next) {

    //sorting
    const {
        sort
    } = req.query
    //sorted by date by default
    let sortKey = "createdAt";

    //sort by vote count or date depending on query - query expects 'date' or 'votes'

    if (sort) {
        sortKey = sort === 'date' ? 'createdAt' : 'upvoteCount'
    }

    try {
        const review = await Reviews.find({
            apartmentId: req.params.id
        }).sort({
            [sortKey]: -1
        })

        res.status(200).json(review)

    } catch (err) {
        res.status(400).send(err.message)
    }
}


/* 
PUT api/v1/review/:id
expects userId in body
and -authorization: bearer token- in header
*/
async function updateReview(req, res, next) {
    const {
        landlordReview,
        environmentReview,
        amenitiesReview,
        image,
        userId
    } = req.body

    //only a creator can update their review
    if (userId !== req.payload.user_id) {
        return res.status(401).send("unauthorised")
    }
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
DELETE api/v1/review/:id
expects review _id 
*/
async function deleteReview(req, res, next) {

    try {
        const review = await Reviews.findOne({
            _id: req.params.id
        })

        //convert to string
        let userIdString = review.userId.toString()

        //only a creator can delete their review
        if (userIdString !== req.payload.user_id) {
            return res.status(401).send("unauthorised")
        }

        await review.remove()

        res.status(200).send('success')

    } catch (err) {
        res.status(400).send(err.message)
    }
}



/* 
POST api/v1/review/upvote
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
                    upvoteCount: 1
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
                        upvoteCount: -1
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
                upvoteCount: 1
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