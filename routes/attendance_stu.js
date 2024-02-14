const express=require('express');

const AttendaceStuController=require('../controller/attendance_stu');

const router=express.Router();


router.post('/add-attendance/', AttendaceStuController.postStudents);

router.get('/get-attendedStu/:date', AttendaceStuController.getAttendedStudents);



module.exports=router;