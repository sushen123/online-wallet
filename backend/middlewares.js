

const jwt = require('jsonwebtoken')

const jwtkey  = require('./cofig');



const authenticateToken = (req,res,next) => {
    
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).json({message: "Authentication header is missing"})
    }
    const token = authHeader.split(" ")[1];

    if(token==null) {
        return res.status(401).json({
            message: "token is missing"
        })
    }

    jwt.verify(token, jwtkey, (err, user) => {
        if(err) {
            return res.status(401).json({
                message: "Invalids or expired token"
            });

    }
   
    req.userId = user.id;
    next();
})

}

module.exports = authenticateToken