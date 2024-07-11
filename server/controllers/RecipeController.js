const Recipe = require('../models/Recipe')

//admin
const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.find({ deleted: false }).populate('category').sort({name:1}).lean()
    if (!recipes) {
        return res.status(404).json({ message: "failed to find recipes." })
    }


    return res.status(201).json({
        error: false,
        message: "",
        data: recipes
    })
}
// User
const getAllRecipesShow = async (req, res) => {
    const recipes = await Recipe.find({ deleted: false, show: true }).populate('category').sort({name:1}).lean()
    if (!recipes) {
        return res.status(404).json({ message: "failed to find recipes." })
    }


    return res.status(201).json({
        error: false,
        message: "",
        data: recipes
    })
}

const getRecipeById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            erroe: true,
            message: "id is required",
            data: null
        })
    }

    const recipe = await Recipe.findById(id).populate('writeruser').lean()
    if (!recipe) {
        return res.status(400).json({
            erroe: true,
            message: "something wrong",
            data: null
        })
    }

    return res.status(201).json({
        erroe: false,
        message: "",
        data: recipe
    })



}
//user -add recipe
const createNewRecipe = async (req, res) => {
    const imgurl = req.file?.filename || ''
    const { name, ingredients, instructions,
        category, type, level
        , preparationtime, description, amount } = req.body

    // console.log("User Info:", req.user);

    if (!name || !imgurl || !ingredients || !instructions || !category || !req.user) {
        return res.status(400).json({
            error: true,
            message: "name,imgurl,ingredients,category,writeruser and instructions are required",
            data: null
        })

    }
    if (type && type != 'DAIRY' && type != 'MEAT' && type != 'PARVE')
        return res.status(400).json({
            error: true,
            message: 'type must be DAIRY or MEAT or PARVE.',
            data: null
        })
    const recipe = await Recipe.create({
        name, imgurl, ingredients, instructions,
        writeruser: req.user._id, category, type, level
        , preparationtime, description, amount
    })
    if (!recipe) {
        return res.status(404).json({
            error: true,
            message: "something wrong.",
            data: null
        })

    }
    return res.status(201).json({
        error: false,
        message: "",
        data: recipe
    })

}

//admin-update a recipe
const updateRecipeByAdmin = async (req, res) => {
    const { id, show, cors } = req.body
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "id is required",
            data: null
        })
    }
    const recipe = await Recipe.findById(id).exec()
    if (!recipe) {
        return res.status(404).json({
            error: true,
            message: "something wrong",
            data: null
        })
    }
    recipe.show = show
    recipe.score = cors
    const updated = await recipe.save()
    return res.status(201).json({
        error: false,
        message: "",
        data: updated
    })
}

//user-update a recipe בתנאי שהוא כתב את המתכון,כלומר יש לעשות מידלור שיבדוק שמי שנמצא ב רק.יזר הוא ה יזרורירט
const updateRecipeByUser = async (req, res) => {
    const imgurl = req.file?.filename || ''
    const { id, name, ingredients, instructions,
        category, type, level
        , preparationtime, description, amount } = req.body
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "id is required",
            data: null
        })
    }
    if (!name || !ingredients || !instructions || !category) {
        return res.status(400).json({
            error: true,
            message: 'name,imgurl,ingredients,category and instructions are required',
            data: null
        })
    }
    if (type && type != 'DAIRY' && type != 'MEAT' && type != 'PARVE') {
        return res.status(400).json(
            {
                error: true,
                message: 'type must be DAIRY or MEAT or PARVE.',
                data: null
            })
    }

    const recipe = await Recipe.findById(id).exec()

    if (!recipe) {
        return res.status(404).json({
            error: true,
            message: "something wrong",
            data: null
        })
    }
    // בדיקה שזה המשתמש שרשם את המתכון או מנהל
    if (recipe.writeruser != req.user._id && req.user.roles != "ADMIN") {
        return res.status(401).json({
            error: true,
            message: "Unauthorized.",
            data: null
        })
    }

    recipe.name = name
    if (imgurl)
        recipe.imgurl = imgurl
    recipe.ingredients = recipe.ingredients
    recipe.instructions = instructions
    recipe.category = category
    recipe.type = type
    recipe.level = level
    recipe.preparationtime = preparationtime
    recipe.description = description
    recipe.amount = amount
    const updated = await recipe.save()
    if (!updated) {
        return res.status(404).json({
            error: true,
            message: "something wrong",
            data: null
        })
    }
    return res.status(201).json({
        error: false,
        message: "",
        data: updated
    })

}
//admin,and user בתנאי שהמשתמש שרוצה למחוק הוא המשתמש שכתב את המתכון
const deleteRecipe = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "id is required",
            data: null
        })
    }
    const recipe = await Recipe.findById(id).exec()

    if (!recipe) {
        return res.status(404).json({
            error: true,
            message: "somthing wrong",
            data: null
        })
    }
    if (recipe.writeruser != req.user._id && req.user.roles != "ADMIN") {
        return res.status(401).json({
            error: "true",
            message: "Unauthorized",
            data: null
        })
    }
    recipe.deleted = true
    const deleted = await recipe.save()
    return res.status(201).json({
        error: false,
        message: "",
        data: deleted
    })

}

const getLatestRecipes = async (req, res) => {
    const latestRecipes = await Recipe.find({ deleted: false, show: true })
        .sort({ createdAt: -1 }).limit(4)
    if (!latestRecipes) {
        return res.status(404).json({
            error: true,
            message: "something wrong",
            data: null
        })
    }
    return res.status(201).json({
        error: false,
        message: "",
        data: latestRecipes
    })

}

const getLatestRecipesByCategoryId = async (req, res) => {
    const {id}=req.params
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "id is required",
            data: null
        })
    }
    
    const latestRecipes = await Recipe.find({ category:id,deleted: false, show: true })
        .sort({ createdAt: -1 }).limit(4)
        
    if (!latestRecipes) {
        return res.status(404).json({
            error: true,
            message: "something wrong",
            data: null
        })
    }
    return res.status(201).json({
        error: false,
        message: "",
        data: latestRecipes
    })

}




module.exports = {
    createNewRecipe,
    updateRecipeByAdmin,
    updateRecipeByUser,
    deleteRecipe,
    getAllRecipes,
    getRecipeById,
    getAllRecipesShow,
    getLatestRecipes,
    getLatestRecipesByCategoryId
}