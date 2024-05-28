const User = require('../models/User')
const bcrypt = require('bcrypt')

//admin
const getAllUsers = async (req, res) => {
    const users = await User.find({ deleted: false }, { password: 0 }).lean()
    if (!users) {
        return res.status(404).json(
            {
                error: true,
                message: "something wrong",
                data: null
            })
    }
    res.status(201).json({
        error: false,
        message: "",
        data: users
    })
}


const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: "id is required" })
    const user = await User.findById(id, { password: 0 }).lean()
    if (!user)
        return res.status(404).json({
            error: true,
            message: "failed find user",
            data: null
        })
    res.status(201).json({
        error: false,
        message: "",
        data: user
    })
}

//admin
const createNewUser = async (req, res) => {

    const { username, password, name, email, phone, roles, active, getmailoninsert } = req.body
    if (!username || !password || !name || !email)
        return res.status(400).json({
            error: true,
            message: "username,password,name and email are required.",
            data: null
        })
    if (roles && roles != 'ADMIN' && roles != 'USER')
        return res.status(400).json({
            error: true,
            message: "enter only ADMIN or USER in roles",
            data: null
        })


    const userSame = await User.findOne({ username: username }, { password: 0 }).lean()
    if (userSame)
        return res.status(409).json({
            error: true,
            message: "usernsme must be uniqe,please choose another username.",
            data: null
        })
    const hashpass = await bcrypt.hash(password, 10)
    const newuser = await User.create({ username, password: hashpass, name, email, phone, roles, active, getmailoninsert })
    if (newuser)
        return res.status(201).json({
            error: false,
            message: "",
            data: newuser.name
        })
    return res.status(404).json({
        error: true,
        message: "something wrong.",
        data: null
    })
}

//admin
const updateUser = async (req, res) => {
    const { id, name, email, phone, roles, active, getmailoninsert } = req.body
    if(!id){
        return res.status(400).json({
            error: true,
            message: "id is required",
            data: null
        })
    }
    const user = await User.findById(id, { password: 0 }).exec()
    if (!user)
        return res.status(404).json({
            error: true,
            message: "failed to find user",
            data: null
        })
    if (!name || !email)
        return res.status(400).json({
            error: true,
            message: "name and email are required.",
            data: null
        })
    if (roles && roles != 'ADMIN' && roles != 'USER')
        return res.status(400).json({
            error: true,
            message: "roles must be ADMIN or USER.",
            data: null
        })

    user.name = name
    user.email = email
    user.phone = phone
    if (roles)
        user.roles = roles
    user.active = active
    user.getmailoninsert = getmailoninsert
    const updated = await user.save()
    if (!updated) {
        return res.status(404).json({
            error: true,
            message: "failed to update.",
            data: null
        })
    }

    return res.status(201).json({
        error: false,
        message: "",
        data: updated.name
    })
}

//admin
const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id, { password: 0 }).exec()
    if (!user)
        return res.json({
            error: true,
            message: "failed to find user",
            data: null
        })
    user.deleted = true
    const deleteduser = await user.save()
    if (!deleteduser) {
        return res.status(404).json({
            error: true,
            message: "something wrong",
            data: null
        })
    }
    return res.status(201).json({
        error: false,
        message: "",
        data: deleteduser.name + ":" + deleteduser.deleted
    })
}
//פונקציה זו יש להעביר לbookRecipesController
const addRecipeToBook = async (req, res) => {
    const { recipeId } = req.body
    const founduser = await User.findOne({ _id: "65ca60eb881afa32f41fecc4" }).exec()
    if (!founduser)
        return res.status(404).json({ message: "failed to recognize user." })
    if (!recipeId)
        return res.status(400).json({ message: "recipeId is required." })

    const allrecipes = [...founduser.personalbookRecipes, { recipeId }]
    founduser.personalbookRecipes = allrecipes
    const updated = await founduser.save()
    res.json({ updatedbook: updated.personalbookRecipes })

}



module.exports = { getAllUsers, getUserById, createNewUser, updateUser, deleteUser }