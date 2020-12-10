function createApartment(req, res, next) {
    res.send('create apartment')
}

function updateApartment(req, res, next) {
    res.send({
        put: true,
        id: req.params.id
    })
}

function deleteApartment(req, res, next) {
    res.send({
        delete: true,
        id: req.params.id
    })
}

module.exports = {
    createApartment,
    updateApartment,
    deleteApartment
}