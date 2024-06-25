const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { password, username, name, email, phone, getmailoninsert } = req.body
    if (!password || !username || !name || !email) {
        return res.status(400).json({
            error: true,
            message: "password,username,name and email are required.",
            data: null
        }
        )
    }

    const userSame = await User.findOne({ username: username }, { password: 0 }).lean()
    if (userSame)
        return res.status(409).json({
            error: true,
            message: "usernsme must be uniqe,please choose another username.",
            data: null
        })
    const hashpass = await bcrypt.hash(password, 10)
    const newuser = await User.create({ username, password: hashpass, name, email, phone, getmailoninsert })
    if (newuser)
        return res.status(201).json({
            error: false,
            message: "",
            data: "create!:" + newuser.name
        })
    res.status(400).json({
        error: true,
        message: "something wrong",
        data: null
    })

}


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const founduser = await User.findOne({ username: username, deleted: false, active: true }).lean()
    if (!founduser) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    const match = await bcrypt.compare(password, founduser.password)
    if (!match) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    //נתינת token:
    const userInformation = {
        _id: founduser._id,
        name: founduser.name,
        username: founduser.username,
        roles: founduser.roles,
        email: founduser.email,
        phone: founduser.phone
    }
    const accessToken = jwt.sign(userInformation, process.env.SYSTEM_TOKEN_PASSWORD, {expiresIn: '15m'})
    
    const refreshToken = jwt.sign({ username: founduser.username }, process.env.REFRESH_TOKEN_PASSWORD, {expiresIn: '7d'})
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000
    })

    res.json({ accessToken })




}

const refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_PASSWORD,
        async (err, decode) => {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: "Forbidden",
                    data: null
                })
            }
            const foundUser = await User.findOne({ username: decode.username, deleted: false, active: true }).lean()
            const userInfo = {
                _id: foundUser.id,
                username: foundUser.username,
                name: foundUser.name,
                roles: foundUser.roles,
                phone: foundUser.phone,
                email: foundUser.email
            }

            const accessToken = jwt.sign(userInfo, process.env.SYSTEM_TOKEN_PASSWORD, { expiresIn: '15m' })

            res.json({ accessToken })
        })

}

const logout = async (req, res) => {
const cookies=req.cookies
if(!cookies?.jwt){
    return res.status(204).json({
        error: true,
        message: "No Content",
        data: null
    })
}

res.clearCookie("jwt",{
    httpOnly: true
})

res.json({
    error: false,
    message: "Cookie Cleard",
    data: null
})
}






module.exports = { register, login, refresh ,logout}

