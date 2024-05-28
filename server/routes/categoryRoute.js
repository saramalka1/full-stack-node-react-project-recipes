const express=require('express')
const router=express.Router()
const multer=require('multer')
const {createNewCategory,updateCategory,getCategoryes,deleteCategory,getCategoryeById}=require('../controllers/categoryController')



//upload image:
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public/categoriesPicture')
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix=Date.now+'-'+Math.round(Math.random()*1E9)
//         cb(null,uniqueSuffix+"-"+file.originalname)
//     }
// })
// const upload=multer({storage:storage})









router.get('/',getCategoryes)

router.get('/:id',getCategoryeById)
//admin
router.post('/',createNewCategory)
//admin
router.put('/:id',deleteCategory)
//admin
router.put('/',updateCategory)


module.exports=router