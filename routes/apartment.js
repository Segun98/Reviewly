const router = require("express").Router()
const {
    createApartment,
    updateApartment,
    deleteApartment
} = require("../controllers/apartment")


router.post('/apartment/create', createApartment)

router.route('/apartment/:id')
    .put(updateApartment)
    .delete(deleteApartment)

module.exports = router