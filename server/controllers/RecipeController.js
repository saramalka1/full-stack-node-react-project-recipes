const Recipe = require('../models/Recipe')

//admin
const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.find({ deleted: false }).lean()
    if (!recipes) {
        return res.status(404).json({ message: "failed to find recipes." })
    }


    return res.status(201).json({
        error: false,
        message: "",
        data: recipes
    })
}

const getRecipeById=async(req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({
            erroe:true,
            message:"id is required",
            data:null
        })
    }

    const recipe=await Recipe.findById(id).lean()
    if(!recipe){
        return res.status(400).json({
            erroe:true,
            message:"something wrong",
            data:null
        })
    }

    return res.status(201).json({
        erroe:false,
        message:"",
        data:recipe
    })

    

}
//user -add recipe
const createNewRecipe = async (req, res) => {
    const { name, imgurl, ingredients, instructions,
        category, type, level
        , preparationtime ,description,amount} = req.body

    if (!name || !imgurl || !ingredients || !instructions || !category) {
        return res.status(400).json({
            error: true,
            message: "name,imgurl,ingredients,category and instructions are required",
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
        writeruser: req.user, category, type, level
        , preparationtime,description,amount
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
    const { id, name, imgurl, ingredients, instructions,
        category, type, level
        , preparationtime,description,amount } = req.body
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "id is required",
            data: null
        })
    }
    if (!name || !imgurl || !ingredients || !instructions || !category) {
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

    recipe.name = name
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
    recipe.deleted=true
    const deleted = await recipe.save()
    return res.status(201).json({
        error: false,
        message: "",
        data: deleted
    })

}




module.exports = {
    createNewRecipe,
    updateRecipeByAdmin,
    updateRecipeByUser,
    deleteRecipe,
    getAllRecipes,
    getRecipeById
}