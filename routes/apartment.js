const router = require("express").Router()
const {
    createApartment,
    updateApartment,
    deleteApartment,
    getApartment
} = require("../controllers/apartment")


router.post('/apartment/create', createApartment)

router.route('/apartment/:id')
    .get(getApartment)
    .put(updateApartment)
    .delete(deleteApartment)

module.exports = router