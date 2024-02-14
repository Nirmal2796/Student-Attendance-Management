const express=require('express');

const StudentController=require('../controller/student');

const router=express.Router();


router.get('/',StudentController.getStudents);


module.exports=router;