const router = require("express").Router()
const {
    login,
    signUp,
    getUser,
    getUsers
} = require("../controllers/auth")
const {
    verifyJwt
} = require("../helpers/auth")

/* 
All routes are prefixed with /api/v1
*/

router.post('/login', login)

router.post('/signup', signUp)

router.get('/user', verifyJwt, getUser)

router.get('/users', getUsers)



module.exports = router