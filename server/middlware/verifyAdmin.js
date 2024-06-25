const verifyAdmin = (req, res, next) => {

    if (req.user && req.user.roles==="ADMIN" ) {
        next()
       
    }
    else{
        return res.status(401).json({
            error: "true",
            message: "Unauthorized admin",
            data: null
        })
    }
    
}

module.exports = verifyAdmin