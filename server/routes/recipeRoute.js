const express = require('express')
const router = express.Router()

const { createNewRecipe,
    updateRecipeByAdmin,
    updateRecipeByUser,
    deleteRecipe,
    getAllRecipes ,
    getRecipeById} = require('../controllers/RecipeController')

  
router.get('/', getAllRecipes)

router.get('/:id',getRecipeById)
//משתמש רשום
router.post('/', createNewRecipe)
//מנהל מעדכן מתכון
router.put('/adminupdaterecipe', updateRecipeByAdmin)
//משתמש מעדכן מתכון בתנאי שזה מתכון שהוא כתב
router.put('/userupdaterecipe', updateRecipeByUser)
//מנהל מוחק מתכון
router.put('/:id', deleteRecipe)

module.exports = router
