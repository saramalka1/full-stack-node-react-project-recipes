const express=require('express')

const router=express.Router()
const verifyJwt=require("../middlware/verifyJwt")
const verifyAdmin=require("../middlware/verifyAdmin")
const {getAllUsers,getUserById,createNewUser,updateUser,deleteUser}=require('../controllers/userController')

router.get('/:id',getUserById)

router.use(verifyJwt)
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