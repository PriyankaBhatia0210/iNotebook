var jwt = require('jsonwebtoken');

fetchuser = (req, res, next)=> {
    var authToken = req.header('auth-token')
    if(!authToken){
        return res.status(401).send({error: 'Please validate with correct auth token now!'})
    }

    try {
        var verifyToken = jwt.verify(authToken, 'MyiNotebook')
        req.user = verifyToken.user
        next()
    } catch(error){
        return res.status(401).send({error: 'Please validate with correct auth token!'})
    }
}
module.exports = fetchuser