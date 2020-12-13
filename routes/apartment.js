const router = require("express").Router()
const {
    createApartment,
    updateApartment,
    deleteApartment,
    getApartment,
    getAllApartments
} = require("../controllers/apartment")


/* 
All routes are prefixed with /api/v1
*/


router.post('/apartment/create', createApartment)

router.get('/apartments', getAllApartments)

router.route('/apartment/:id')
    .get(getApartment)
    .put(updateApartment)
    .delete(deleteApartment)

module.exports = router