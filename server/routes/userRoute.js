const express=require('express')

const router=express.Router()
const verifyJwt=require("../middlware/verifyJwt")
const verifyAdmin=require("../middlware/verifyAdmin")
const {getAllUsers,getUserById,createNewUser,updateUser,deleteUser,addRecipeToBook,getPBook,deleteRecipeFromPBook,updateCommentInPBook,getSingleInPBook}=require('../controllers/userController')

router.get('/pbook',verifyJwt,getPBook)
router.get('/pbook/:id',verifyJwt,getSingleInPBook)
router.get('/:id',getUserById)

router.use(verifyJwt)

router.put('/pbook/addrecipetopbook',addRecipeToBook)

router.put('/pbook/deleterecipefrombook',deleteRecipeFromPBook)
router.put('/pbook/updatecomment',updateCommentInPBook)

router.use(verifyAdmin)

//admin
router.get('/',getAllUsers)
//admin
router.post('/',createNewUser)
//admin
router.put('/:id',deleteUser)
//admin
router.put('/',updateUser)


module.exports=router