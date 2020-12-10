function signUp(req, res, next) {
    console.log(req.body);
    res.json({
        success: true,
        message: "Your data came in"
    })
}

function login(req, res, next) {
    console.log(req.body);
    res.json({
        success: true,
        message: "Your data came in"
    })
}


module.exports = {
    signUp,
    login
}