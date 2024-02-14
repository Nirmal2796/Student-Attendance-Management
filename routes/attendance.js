const express=require('express');

const AttendaceController=require('../controller/attendance');

const router=express.Router();


router.get('/get-attendance', AttendaceController.getAttendance);

router.get('/get-attendanceCount', AttendaceController.getAttendanceCount);


module.exports=router;