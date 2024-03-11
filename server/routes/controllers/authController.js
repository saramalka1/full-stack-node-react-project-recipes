const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
    const { password, username, name, email, phone ,getmailoninsert} = req.body
    if (!password || !username || !name || !email) {
        return res.status(400).json({ message: "password,username,name and email are required." })
    }

    const userSame = await User.findOne({ username: username }, { password: 0 }).lean()
    if (userSame)
        return res.status(409).json({ message: "usernsme must be uniqe,please choose another username." })
    const hashpass = await bcrypt.hash(password, 10)
    const newuser = await User.create({ username, password: hashpass, name, email, phone,getmailoninsert })
    if (newuser)
        return res.status(201).json({ message: "create!" })
    res.status(400).json({ message: "error" })

}


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400).json({ message: "All fields are required" })
    const founduser = await User.findOne({ username }).lean()
    if (!founduser || !founduser.active)
        return res.status(401).json({ message: "Anauthorized." })
    const match=await bcrypt.compare(password,founduser.password)
    if(!match)
    return res.status(401).json({ message: "Anauthorized." })
const userInformation={
    _id:founduser._id,
    name:founduser.name,
    username:founduser.username,
    roles:founduser.roles,
    email:founduser.email,
    phone:founduser.phone
}
const accessToken=jwt.sign(userInformation,process.env.SYSTEM_TOKEN_PASSWORD)
res.json({token:accessToken})

}



module.exports = { register ,login}

