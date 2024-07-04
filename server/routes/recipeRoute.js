const express = require('express')
const router = express.Router()
const multer=require('multer')
const verifyJwt=require("../middlware/verifyJwt")
const verifyAdmin=require("../middlware/verifyAdmin")
const { createNewRecipe,
    updateRecipeByAdmin,
    updateRecipeByUser,
    deleteRecipe,
    getAllRecipes ,
    getAllRecipesShow,
    getRecipeById} = require('../controllers/RecipeController')


    ////////////
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix   +"-" + file.originalname)
        }
      })
      
      const upload = multer({ storage: storage })
    ////////////

//זה אפשרי בכל לכל סוג משתמש 
router.get('/recipesshow',getAllRecipesShow) 
//רק למנהל
router.get('/',verifyJwt,verifyAdmin, getAllRecipes)
router.get('/:id',getRecipeById)
//משתמש רשום
router.post('/', verifyJwt,upload.single('imgurl'),createNewRecipe)
//מנהל מעדכן מתכון
router.put('/adminupdaterecipe',verifyJwt,verifyAdmin, updateRecipeByAdmin)
//  משתמש מעדכן מתכון בתנאי שזה מתכון שהוא כתב או שזה המנהל
router.put('/userupdaterecipe',verifyJwt,upload.single('imgurl'), updateRecipeByUser)
//מנהל מוחק מתכון או מי שכתב אותו
router.put('/:id',verifyJwt, deleteRecipe)

module.exports = router
