const Users = require("../models/users")
const bcrypt = require("bcryptjs")
const {
    createToken
} = require("../helpers/auth")

/* 
POST /api/v1/signup
*/
async function signUp(req, res, next) {
    const {
        name,
        email,
        password,
    } = req.body

    //simple validation
    if (!email || !name || !password) {
        return res.status(400).send("All fields are required")
    }
    //check if email exists
    const emailExists = await Users.findOne({
        email
    })

    if (emailExists) {
        return res.status(400).send("email already exists")
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    try {
        await Users.create({
            name,
            email,
            password: hashedpassword
        })
        return res.status(200).send("sign up successful")

    } catch (err) {
        res.status(400).send(err.message)
    }

}


/* 
POST /api/v1/login
*/

async function login(req, res, next) {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        return res.status(400).send("Fll in all fields")
    }

    try {
        const user = await Users.findOne({
            email
        })

        if (!user) {
            return res.status(404).send("email or password is wrong")
        }

        const validPass = await bcrypt.compare(password, user.password)

        if (!validPass) {
            return res.status(400).send("email or password is wrong")
        }

        const token = createToken(user)

        res.status(200).send({
            message: "successfully logged in",
            accesstoken: token
        })

    } catch (err) {
        res.status(400).send(err.message)
    }
}

/* 
fetches all users.
GET /api/v1/users
*/
async function getUsers(req, res, next) {
    try {
        //return just email and name
        const users = await Users.find({}, {
            name: 1,
            email: 1
        })

        res.status(200).send(users)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

/* 
fetches logged in user based on json web token.
GET /api/v1/user
*/
async function getUser(req, res, next) {
    try {

        //return name and email only
        const user = await Users.findOne({
            _id: req.payload.user_id
        }, {
            name: 1,
            email: 1
        })
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    signUp,
    login,
    getUser,
    getUsers
}