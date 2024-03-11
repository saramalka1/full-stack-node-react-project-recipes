const express=require('express')

const router=express.Router()
const {getAllUsers,getUserById,createNewUser,updateUser,deleteUser}=require('../controllers/userController')

//admin
router.get('/',getAllUsers)

router.get('/:id',getUserById)

//admin
router.post('/',createNewUser)

//admin
router.put('/:id',deleteUser)

//admin
router.put('/',updateUser)


module.exports=router