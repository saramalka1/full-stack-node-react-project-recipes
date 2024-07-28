
const jwt = require("jsonwebtoken")
const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "true",
            message: "Unauthorized",
            data: null
        })
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.SYSTEM_TOKEN_PASSWORD,
        (err, decode) => {
            if (err) {
                return res.status(403).json({
                    error: "true",
                    message: "Forbidden",
                    data: null
                })
            }
            // console.log("Decoded JWT:", decode);
            req.user = decode
<<<<<<< HEAD
=======
            console.log("user:",req.user._id);
>>>>>>> e610c7c554dd72914694e2574747fd7c8a406a34
            next()
        })
}

module.exports = verifyJwt