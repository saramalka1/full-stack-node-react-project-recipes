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
    if (!id) {
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
//פונקציות לטיפול בספר מתכונים אישי
//פונקצית הוספת מתכון לספר
//V
const addRecipeToBook = async (req, res) => {
    //נקבל את קוד המשתמש כדי שנדע לאיזה ספר לגשת
    //ונקבל קוד מתכון כדי לדעת איזה מתכון להוסיף
    const { recipeId } = req.body
    const founduser = await User.findOne({ _id: req.user._id }).exec()
    if (!founduser)
        return res.status(404).json({
            error: true,
            message: "failed to recognize user.",
            data: null
        })
    if (!recipeId)
        return res.status(400).json({
            error: true,
            message: "recipeId is required.",
            data: null
        })

    const allrecipes = [...founduser.personalBook, { recipe: recipeId, Comment: '' }]
    founduser.personalBook = allrecipes
    const updated = await founduser.save()
    res.status(201).json({
        error: false,
        message: '',
        data: updated
    })

}
//פונקציה שמחזירה את הספר מתכונים של המשתמש שנמצא עכשיו במערכת
//V
const getPBook = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user }).populate('personalBook.recipe').lean();

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "user not found",
                data: null
            });
        }

        // יצירת מערך חדש שמכיל את המתכון ואת ההערה באותו אובייקט
        const personalBook = user.personalBook.map(item => ({
            recipe: item.recipe,
            comment: item.comment,
            _id:item._id
        }));

        res.status(200).json({
            error: false,
            message: "",
            data: personalBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "internal server error",
            data: null
        });
    }
}


//  פונקציה שמחזירה אוביקט מסוים בספר המתכונים
//V
const getSingleInPBook = async (req, res) => {
    try {
        // מוצא את המשתמש ומביא את המידע על המתכונים בספר האישי שלו
        const user = await User.findOne({ _id: req.user }).populate('personalBook.recipe').lean();

        // אם המשתמש לא נמצא, מחזיר שגיאה
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
                data: null
            });
        }

        
        const { id } = req.params;

        // מחפש את האובייקט המתאים בספר האישי
        const personalBookEntry = user.personalBook.find(entry => entry._id.toString() === id);

        // אם האובייקט לא נמצא, מחזיר שגיאה
        if (!personalBookEntry) {
            return res.status(404).json({
                error: true,
                message: "Entry not found in personal book",
                data: null
            });
        }

        // מחזיר את כל האובייקט שנמצא, כולל את המתכון וההערה
        return res.status(200).json({
            error: false,
            message: "",
            data: {
                recipe:personalBookEntry.recipe,
                comment:personalBookEntry.comment,
                _id:personalBookEntry._id
            }
        });

    } catch (error) {
        // במקרה של שגיאה, מחזיר הודעת שגיאה כללית
        return res.status(500).json({
            error: true,
            message: "An error occurred",
            data: error.message
        });
    }
};

//פונקציה שמוחקת מתכון מהספר מתכונים
//V
const deleteRecipeFromPBook = async (req, res) => {
    const user = await User.findOne({ _id: req.user }).exec()
    if (!user) {
        return res.status(404).json({
            error: true,
            message: "user not found",
            data: null
        })
    }
    const { objId } = req.body
    const recipes = user.personalBook.filter(r=>r._id.toString()!==objId)
    user.personalBook = recipes
    const updated = await user.save()
    if (updated) {
        return res.status(201).json({
            error: false,
            message: "",
            data: user.personalBook
        })
    }
    return res.status(404).json({
        error: true,
        message: "something wrong",
        data: null
    })

}

//פונקציה לעדכון הערה על מתכון מסוים
//V
const updateCommentInPBook = async (req, res) => {
    //נמצא את המשתמש
    // לכל אוביקט בספר המתכונים יש קוד, לפי זה נמצא את המתכון המבוקש ונערוך את ההערות שלו
    const user = await User.findOne({ _id: req.user }).populate('personalBook.recipe').exec()
    if (!user) {
        return res.status(404).json({
            error: true,
            message: "user not found",
            data: null
        })
    }

    //כעת נמצא את האוביקט המבוקש(שמכיל גם מתכון וגם הערה ויש לו קוד משל עצמו)
    const { objId, comment } = req.body
    const recipeObjwithComment =  user.personalBook.find(o=>o._id.toString()===objId)
    if (!recipeObjwithComment) {
        return res.status(404).json({
            error: true,
            message: "recipeObjwithComment not found",
            data: null
        })
    }
    //עדכון האוביקט עם השינוי של ההערה 
    recipeObjwithComment.comment = comment
    //עדכון הספר עם האוביקט המעודכן
    
    const updated = await user.save()
    if (!updated) {
        return res.status(404).json({
            error: true,
            message: "failed to update comment",
            data: null
        })
    }
    return res.status(201).json({
        error:false,
        message:'',
        data:user.personalBook
    })
}

// 






module.exports = { getAllUsers, getUserById, createNewUser, updateUser, deleteUser, addRecipeToBook, getPBook, deleteRecipeFromPBook,updateCommentInPBook ,getSingleInPBook}