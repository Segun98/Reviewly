/* 
GET request for all reviews
*/

function getReviews(req, res, next) {
    console.log(req.ip);
    res.json({
        name: "Segun",
        review: "Nice place"
    })
}

module.exports = {
    getReviews
}