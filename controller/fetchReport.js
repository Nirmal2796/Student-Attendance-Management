const Attendace=require('../model/attendance');

const StuAttendance=require('../model/stu_attendance');

exports.getReport=(req,res,next)=>{
    StuAttendance.count({group:['studentId']})
    .then(data=>{
        console.log(data);
        res.status(200).json(data);
    })
    .catch(err=>console.log(err));
}

