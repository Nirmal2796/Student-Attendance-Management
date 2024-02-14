const Attendace=require('../model/attendance');


exports.getAttendance=(req,res,next)=>{
    Attendace.findAll()
    .then((attendance)=>{
        res.status(200).json(attendance);
    })
    .catch(err=> console.log(err));
}

exports.getAttendanceCount=(req,res,next)=>{
    Attendace.count({distinct:true , col:'date'})
    .then((count)=>{
        // console.log(count.count);
        res.status(200).json(count);
    })
    .catch(err=> console.log(err));
}



