const Apartments = require("../models/apartments")

/* 
POST /api/apartment/create
*/
async function createApartment(req, res, next) {
    const {
        name,
        location,
        image
    } = req.body

    if (!name || !location) {
        return res.status(400).send("Name and location fields are required")
    }

    try {
        await Apartments.create({
            name,
            location,
            image
        })
        res.status(201).send('success!')
    } catch (err) {
        res.status(400).send(err.message)
    }

}

/* 
get a single apartment
GET /api/apartment/:id
*/
async function getApartment(req, res, next) {
    try {
        const apartment = await Apartments.find({
            _id: req.params.id
        })

        res.status(200).json(apartment)

    } catch (err) {
        res.status(400).send(err.message)
    }
}

/* 
update an apartment details
PUT /api/apartment/:id
*/

async function updateApartment(req, res, next) {
    res.send({
        put: true,
        id: req.params.id
    })
}


/* 
delete an apartment
DELETE /api/apartment/:id
*/

async function deleteApartment(req, res, next) {
    res.send({
        delete: true,
        id: req.params.id
    })
}

module.exports = {
    createApartment,
    getApartment,
    updateApartment,
    deleteApartment
}