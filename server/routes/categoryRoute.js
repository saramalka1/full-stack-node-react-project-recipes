const express=require('express')
const router=express.Router()
const multer=require('multer')
const verifyJwt=require("../middlware/verifyJwt")
const verifyAdmin=require("../middlware/verifyAdmin")

const {createNewCategory,updateCategory,getCategoryes,deleteCategory,getCategoryeById}=require('../controllers/categoryController')


///////////////
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
///////////////



router.get('/',getCategoryes)

router.get('/:id',getCategoryeById)
// router.use(verifyJwt)
// router.use(verifyAdmin)
//admin
router.post('/',upload.single('img'),createNewCategory)
//admin
router.put('/:id',deleteCategory)
//admin
router.put('/',upload.single('img'),updateCategory)


module.exports=router