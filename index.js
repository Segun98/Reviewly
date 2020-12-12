const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config({
    path: "./config/config.env"
})

//db connection
require("./config/db")()


//import routes
const auth = require("./routes/auth")
const reviews = require("./routes/reviews")
const apartment = require("./routes/apartment")

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//routes
app.use('/api/v1', auth)
app.use('/api/v1', reviews)
app.use('/api/v1', apartment)

let PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))