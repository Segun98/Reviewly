const Apartments = require("../models/apartments")

/* 
POST /api/apartment/create
*/
async function createApartment(req, res, next) {
    const {
        name,
        location,
        description,
        image
    } = req.body

    if (!name || !location || !description) {
        return res.status(400).send("Name, description and location fields are required")
    }

    try {
        await Apartments.create({
            name,
            location,
            description,
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

        res.status(200).json(apartment[0])

    } catch (err) {
        res.status(400).send(err.message)
    }
}


/* 
get all apartment
GET /api/apartments
*/
async function getAllApartments(req, res, next) {
    try {
        const apartment = await Apartments.find()

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
    const {
        name,
        location,
        image,
        description
    } = req.body

    try {
        await Apartments.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                name,
                location,
                description,
                image
            }
        })

        res.status(200).send('updated')

    } catch (err) {
        res.status(400).send(err.message)
    }
}


/* 
delete an apartment
DELETE /api/apartment/:id
*/

async function deleteApartment(req, res, next) {

    try {
        const apartment = await Apartments.findOne({
            _id: req.params.id
        })
        await apartment.remove()

        res.status(200).send('success')

    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    createApartment,
    getApartment,
    getAllApartments,
    updateApartment,
    deleteApartment
}