const express = require("express")
const app = express()
require("dotenv").config({
    path: "./config/config.env"
})

//db connection
// require("./config/db")()


//import routes
const auth = require("./routes/auth")
const reviews = require("./routes/reviews")
const apartment = require("./routes/apartment")

//middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//routes
app.use('/api', auth)
app.use('/api', reviews)
app.use('/api', apartment)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))